import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { characterData, userId } = await req.json();
    
    console.log('Generating character:', characterData);

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    const replicateApiKey = Deno.env.get('REPLICATE_API_KEY');
    
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create the Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate character image with OpenAI
    const imagePrompt = `Professional character portrait: ${characterData.description}. ${characterData.gender} character, ${characterData.ageRange} age range, ${characterData.ethnicity} ethnicity. Personality traits: ${characterData.personality.join(', ')}. ${characterData.style} art style. High quality, detailed, consistent character design.`;
    
    console.log('Generating image with prompt:', imagePrompt);

    const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: imagePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'hd',
        output_format: 'png'
      }),
    });

    if (!imageResponse.ok) {
      const errorText = await imageResponse.text();
      console.error('OpenAI Image API error:', errorText);
      throw new Error(`Failed to generate image: ${imageResponse.status}`);
    }

    const imageData = await imageResponse.json();
    console.log('Image generated successfully');

    // Save character to database
    const { data: character, error: characterError } = await supabase
      .from('characters')
      .insert({
        name: characterData.name,
        description: characterData.description,
        personality_traits: characterData.personality,
        voice_type: characterData.voiceType,
        age_range: characterData.ageRange,
        gender: characterData.gender,
        ethnicity: characterData.ethnicity,
        style: characterData.style,
        user_id: userId,
        visual_dna: {
          base_prompt: imagePrompt,
          generated_at: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (characterError) {
      console.error('Database error:', characterError);
      throw new Error('Failed to save character');
    }

    console.log('Character saved to database:', character.id);

    // Save character image asset
    const { error: assetError } = await supabase
      .from('character_assets')
      .insert({
        character_id: character.id,
        asset_type: 'image',
        asset_url: imageData.data[0].url || imageData.data[0].b64_json,
        generation_parameters: {
          model: 'gpt-image-1',
          prompt: imagePrompt,
          size: '1024x1024',
          quality: 'hd'
        },
        quality_score: 0.9
      });

    if (assetError) {
      console.error('Asset save error:', assetError);
    }

    return new Response(JSON.stringify({
      success: true,
      character,
      imageUrl: imageData.data[0].url || `data:image/png;base64,${imageData.data[0].b64_json}`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-character function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});