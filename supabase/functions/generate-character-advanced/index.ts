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
    const { advancedSettings } = characterData;
    
    console.log('Generating advanced character:', characterData);

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create the Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Build advanced prompt based on settings
    const basePrompt = `Professional character portrait: ${characterData.description}. ${characterData.gender} character, ${characterData.ageRange} age range, ${characterData.ethnicity} ethnicity. Personality traits: ${characterData.personality.join(', ')}.`;
    
    // Add angle specification
    const anglePrompts = {
      'front': 'facing directly forward, looking at camera',
      '3quarter-left': 'turned 3/4 to the left, showing left side of face and body',
      'left': 'complete left profile view, showing side silhouette',
      '3quarter-right': 'turned 3/4 to the right, showing right side of face and body', 
      'right': 'complete right profile view, showing side silhouette',
      'back': 'back view, showing rear of character, looking away from camera'
    };

    // Add background specification  
    const backgroundPrompts = {
      'white-studio': 'pure white studio background, professional photography lighting',
      'photography-studio': 'professional photography studio with soft lighting and minimal shadows',
      'gradient-studio': 'subtle gradient studio background from white to light gray',
      'dark-studio': 'dark professional studio background with dramatic lighting',
      'colored-backdrop': 'clean colored backdrop with professional studio lighting',
      'natural-light': 'soft natural lighting with clean white background'
    };

    // Add outfit specification
    const outfitPrompts = {
      'default': 'default outfit that matches the character description',
      'formal': 'formal wear, elegant and sophisticated clothing',
      'casual': 'casual comfortable clothing, relaxed style',
      'business': 'professional business attire, corporate style',
      'fantasy': 'fantasy costume with ornate details and mystical elements',
      'historical': 'historically accurate period clothing',
      'modern': 'contemporary modern fashion, trendy and stylish'
    };

    // Add emotion specification
    const emotionPrompts = {
      'neutral': 'neutral facial expression, calm and composed',
      'happy': 'genuinely happy expression, warm smile',
      'serious': 'serious and focused expression, determined look',
      'confident': 'confident and self-assured expression',
      'thoughtful': 'thoughtful and contemplative expression',
      'determined': 'determined and resolute expression',
      'friendly': 'friendly and approachable expression',
      'mysterious': 'mysterious and enigmatic expression'
    };

    // Add pose specification for full-body
    const posePrompts = {
      'standing-neutral': 'standing in a neutral, relaxed pose',
      'confident-stance': 'confident stance with strong posture',
      'action-pose': 'dynamic action pose showing movement',
      'casual-pose': 'casual relaxed pose, natural positioning',
      'heroic-pose': 'heroic pose with strong, commanding presence',
      'thinking-pose': 'contemplative thinking pose'
    };

    let fullPrompt = basePrompt;
    
    // Add angle description
    if (advancedSettings.angle && anglePrompts[advancedSettings.angle]) {
      fullPrompt += ` ${anglePrompts[advancedSettings.angle]}.`;
    }

    // Add background description
    if (advancedSettings.background && backgroundPrompts[advancedSettings.background]) {
      fullPrompt += ` Background: ${backgroundPrompts[advancedSettings.background]}.`;
    }

    // Add outfit description
    if (advancedSettings.outfit && outfitPrompts[advancedSettings.outfit]) {
      fullPrompt += ` Clothing: ${outfitPrompts[advancedSettings.outfit]}.`;
    }

    // Add emotion description
    if (advancedSettings.emotion && emotionPrompts[advancedSettings.emotion]) {
      fullPrompt += ` Expression: ${emotionPrompts[advancedSettings.emotion]}.`;
    }

    // Add type-specific prompts
    if (advancedSettings.type === 'portrait') {
      fullPrompt += ' Close-up portrait shot, head and shoulders only, high detail on facial features.';
    } else if (advancedSettings.type === 'full-body') {
      fullPrompt += ' Full body shot, showing complete character from head to toe.';
    }

    // Add quality and style modifiers
    fullPrompt += ` ${characterData.style} art style. Ultra high resolution, professional photography quality, consistent character design, perfect lighting, sharp focus.`;

    console.log('Generated prompt:', fullPrompt);

    // Generate image with OpenAI
    const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: fullPrompt,
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

    // First, create or get the character
    let character;
    if (characterData.characterId) {
      // Get existing character
      const { data: existingCharacter, error: fetchError } = await supabase
        .from('characters')
        .select()
        .eq('id', characterData.characterId)
        .single();
      
      if (fetchError) {
        throw new Error('Character not found');
      }
      character = existingCharacter;
    } else {
      // Create new character
      const { data: newCharacter, error: characterError } = await supabase
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
            base_prompt: fullPrompt,
            generated_at: new Date().toISOString(),
            advanced_settings: advancedSettings
          }
        })
        .select()
        .single();

      if (characterError) {
        console.error('Database error:', characterError);
        throw new Error('Failed to save character');
      }
      character = newCharacter;
    }

    console.log('Character processed:', character.id);

    // Save character asset with advanced metadata
    const { data: asset, error: assetError } = await supabase
      .from('character_assets')
      .insert({
        character_id: character.id,
        asset_type: 'image',
        asset_url: imageData.data[0].url || imageData.data[0].b64_json,
        generation_parameters: {
          model: 'gpt-image-1',
          prompt: fullPrompt,
          size: '1024x1024',
          quality: 'hd',
          advanced_settings: advancedSettings
        },
        asset_data: {
          angle: advancedSettings.angle,
          background: advancedSettings.background,
          outfit: advancedSettings.outfit,
          emotion: advancedSettings.emotion,
          type: advancedSettings.type
        },
        quality_score: 0.95
      })
      .select()
      .single();

    if (assetError) {
      console.error('Asset save error:', assetError);
      throw new Error('Failed to save character asset');
    }

    return new Response(JSON.stringify({
      success: true,
      character,
      asset,
      imageUrl: imageData.data[0].url || `data:image/png;base64,${imageData.data[0].b64_json}`,
      advancedSettings
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-character-advanced function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});