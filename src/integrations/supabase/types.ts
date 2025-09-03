export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          context_apis: string[] | null
          context_metadata: Json | null
          conversation_title: string | null
          created_at: string | null
          id: string
          is_archived: boolean | null
          last_activity: string | null
          session_id: string
          total_messages: number | null
          total_tokens: number | null
          user_id: string | null
        }
        Insert: {
          context_apis?: string[] | null
          context_metadata?: Json | null
          conversation_title?: string | null
          created_at?: string | null
          id?: string
          is_archived?: boolean | null
          last_activity?: string | null
          session_id: string
          total_messages?: number | null
          total_tokens?: number | null
          user_id?: string | null
        }
        Update: {
          context_apis?: string[] | null
          context_metadata?: Json | null
          conversation_title?: string | null
          created_at?: string | null
          id?: string
          is_archived?: boolean | null
          last_activity?: string | null
          session_id?: string
          total_messages?: number | null
          total_tokens?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_embeddings: {
        Row: {
          chunk_index: number | null
          chunk_text: string
          content_id: string
          content_type: string
          created_at: string | null
          embedding_model: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          chunk_index?: number | null
          chunk_text: string
          content_id: string
          content_type: string
          created_at?: string | null
          embedding_model?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          chunk_index?: number | null
          chunk_text?: string
          content_id?: string
          content_type?: string
          created_at?: string | null
          embedding_model?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      api_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "api_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "api_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      api_changelogs: {
        Row: {
          api_id: string | null
          breaking_changes: boolean | null
          change_type: string
          created_at: string | null
          description: string | null
          id: string
          impact_level: string | null
          migration_guide: string | null
          release_date: string | null
          title: string
          version: string
        }
        Insert: {
          api_id?: string | null
          breaking_changes?: boolean | null
          change_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          impact_level?: string | null
          migration_guide?: string | null
          release_date?: string | null
          title: string
          version: string
        }
        Update: {
          api_id?: string | null
          breaking_changes?: boolean | null
          change_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          impact_level?: string | null
          migration_guide?: string | null
          release_date?: string | null
          title?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_changelogs_api_id_fkey"
            columns: ["api_id"]
            isOneToOne: false
            referencedRelation: "apis"
            referencedColumns: ["id"]
          },
        ]
      }
      api_crawl_sources: {
        Row: {
          crawl_config: Json | null
          crawl_frequency: unknown | null
          created_at: string | null
          id: string
          is_active: boolean | null
          last_crawled: string | null
          name: string
          next_crawl: string | null
          source_type: string
          success_rate: number | null
          total_apis_found: number | null
          url: string
        }
        Insert: {
          crawl_config?: Json | null
          crawl_frequency?: unknown | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_crawled?: string | null
          name: string
          next_crawl?: string | null
          source_type: string
          success_rate?: number | null
          total_apis_found?: number | null
          url: string
        }
        Update: {
          crawl_config?: Json | null
          crawl_frequency?: unknown | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_crawled?: string | null
          name?: string
          next_crawl?: string | null
          source_type?: string
          success_rate?: number | null
          total_apis_found?: number | null
          url?: string
        }
        Relationships: []
      }
      api_discovery_logs: {
        Row: {
          action: string
          apis_added: number | null
          apis_found: number | null
          apis_updated: number | null
          created_at: string | null
          data: Json | null
          error_message: string | null
          execution_time: unknown | null
          id: string
          source: string
          source_id: string | null
          status: string
        }
        Insert: {
          action: string
          apis_added?: number | null
          apis_found?: number | null
          apis_updated?: number | null
          created_at?: string | null
          data?: Json | null
          error_message?: string | null
          execution_time?: unknown | null
          id?: string
          source: string
          source_id?: string | null
          status?: string
        }
        Update: {
          action?: string
          apis_added?: number | null
          apis_found?: number | null
          apis_updated?: number | null
          created_at?: string | null
          data?: Json | null
          error_message?: string | null
          execution_time?: unknown | null
          id?: string
          source?: string
          source_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_discovery_logs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "api_crawl_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      api_endpoints: {
        Row: {
          api_id: string | null
          auth_required: boolean | null
          created_at: string | null
          deprecated: boolean | null
          description: string | null
          example_request: string | null
          example_response: string | null
          id: string
          method: string
          parameters: Json | null
          path: string
          rate_limit_specific: string | null
          request_schema: Json | null
          response_schema: Json | null
        }
        Insert: {
          api_id?: string | null
          auth_required?: boolean | null
          created_at?: string | null
          deprecated?: boolean | null
          description?: string | null
          example_request?: string | null
          example_response?: string | null
          id?: string
          method: string
          parameters?: Json | null
          path: string
          rate_limit_specific?: string | null
          request_schema?: Json | null
          response_schema?: Json | null
        }
        Update: {
          api_id?: string | null
          auth_required?: boolean | null
          created_at?: string | null
          deprecated?: boolean | null
          description?: string | null
          example_request?: string | null
          example_response?: string | null
          id?: string
          method?: string
          parameters?: Json | null
          path?: string
          rate_limit_specific?: string | null
          request_schema?: Json | null
          response_schema?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "api_endpoints_api_id_fkey"
            columns: ["api_id"]
            isOneToOne: false
            referencedRelation: "apis"
            referencedColumns: ["id"]
          },
        ]
      }
      api_examples: {
        Row: {
          api_id: string | null
          code_example: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty_level: string | null
          downvotes: number | null
          endpoint_id: string | null
          id: string
          language: string
          request_example: string
          response_example: string
          tags: string[] | null
          title: string | null
          updated_at: string | null
          upvotes: number | null
          use_case: string | null
        }
        Insert: {
          api_id?: string | null
          code_example?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: string | null
          downvotes?: number | null
          endpoint_id?: string | null
          id?: string
          language: string
          request_example: string
          response_example: string
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          upvotes?: number | null
          use_case?: string | null
        }
        Update: {
          api_id?: string | null
          code_example?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: string | null
          downvotes?: number | null
          endpoint_id?: string | null
          id?: string
          language?: string
          request_example?: string
          response_example?: string
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          upvotes?: number | null
          use_case?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_examples_api_id_fkey"
            columns: ["api_id"]
            isOneToOne: false
            referencedRelation: "apis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_examples_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "api_endpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      api_integrations: {
        Row: {
          api_id: string | null
          created_at: string | null
          created_by: string | null
          dependencies: string[] | null
          difficulty_level: string | null
          estimated_time: unknown | null
          id: string
          integration_type: string
          platform: string
          popularity_score: number | null
          setup_instructions: string | null
          template_code: string
          updated_at: string | null
        }
        Insert: {
          api_id?: string | null
          created_at?: string | null
          created_by?: string | null
          dependencies?: string[] | null
          difficulty_level?: string | null
          estimated_time?: unknown | null
          id?: string
          integration_type: string
          platform: string
          popularity_score?: number | null
          setup_instructions?: string | null
          template_code: string
          updated_at?: string | null
        }
        Update: {
          api_id?: string | null
          created_at?: string | null
          created_by?: string | null
          dependencies?: string[] | null
          difficulty_level?: string | null
          estimated_time?: unknown | null
          id?: string
          integration_type?: string
          platform?: string
          popularity_score?: number | null
          setup_instructions?: string | null
          template_code?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_integrations_api_id_fkey"
            columns: ["api_id"]
            isOneToOne: false
            referencedRelation: "apis"
            referencedColumns: ["id"]
          },
        ]
      }
      api_intelligence: {
        Row: {
          api_id: string | null
          confidence_score: number | null
          content: string
          created_at: string | null
          generated_by: string | null
          id: string
          intelligence_type: string
          language: string | null
          metadata: Json | null
          updated_at: string | null
        }
        Insert: {
          api_id?: string | null
          confidence_score?: number | null
          content: string
          created_at?: string | null
          generated_by?: string | null
          id?: string
          intelligence_type: string
          language?: string | null
          metadata?: Json | null
          updated_at?: string | null
        }
        Update: {
          api_id?: string | null
          confidence_score?: number | null
          content?: string
          created_at?: string | null
          generated_by?: string | null
          id?: string
          intelligence_type?: string
          language?: string | null
          metadata?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_intelligence_api_id_fkey"
            columns: ["api_id"]
            isOneToOne: false
            referencedRelation: "apis"
            referencedColumns: ["id"]
          },
        ]
      }
      api_monitoring: {
        Row: {
          api_id: string | null
          check_timestamp: string | null
          check_type: string | null
          error_message: string | null
          id: string
          is_available: boolean | null
          metadata: Json | null
          response_time: number | null
          status_code: number | null
        }
        Insert: {
          api_id?: string | null
          check_timestamp?: string | null
          check_type?: string | null
          error_message?: string | null
          id?: string
          is_available?: boolean | null
          metadata?: Json | null
          response_time?: number | null
          status_code?: number | null
        }
        Update: {
          api_id?: string | null
          check_timestamp?: string | null
          check_type?: string | null
          error_message?: string | null
          id?: string
          is_available?: boolean | null
          metadata?: Json | null
          response_time?: number | null
          status_code?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "api_monitoring_api_id_fkey"
            columns: ["api_id"]
            isOneToOne: false
            referencedRelation: "apis"
            referencedColumns: ["id"]
          },
        ]
      }
      api_pricing: {
        Row: {
          api_id: string | null
          billing_period: string | null
          created_at: string | null
          currency: string | null
          features: string[] | null
          id: string
          is_popular: boolean | null
          limitations: string[] | null
          price: number
          requests_per_month: number | null
          requests_per_second: number | null
          sla_uptime: number | null
          support_level: string | null
          tier_name: string
        }
        Insert: {
          api_id?: string | null
          billing_period?: string | null
          created_at?: string | null
          currency?: string | null
          features?: string[] | null
          id?: string
          is_popular?: boolean | null
          limitations?: string[] | null
          price?: number
          requests_per_month?: number | null
          requests_per_second?: number | null
          sla_uptime?: number | null
          support_level?: string | null
          tier_name: string
        }
        Update: {
          api_id?: string | null
          billing_period?: string | null
          created_at?: string | null
          currency?: string | null
          features?: string[] | null
          id?: string
          is_popular?: boolean | null
          limitations?: string[] | null
          price?: number
          requests_per_month?: number | null
          requests_per_second?: number | null
          sla_uptime?: number | null
          support_level?: string | null
          tier_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_pricing_api_id_fkey"
            columns: ["api_id"]
            isOneToOne: false
            referencedRelation: "apis"
            referencedColumns: ["id"]
          },
        ]
      }
      api_providers: {
        Row: {
          contact_info: Json | null
          created_at: string | null
          description: string | null
          employee_count: string | null
          founded_year: number | null
          funding_info: Json | null
          headquarters: string | null
          id: string
          logo_url: string | null
          name: string
          social_links: Json | null
          trust_score: number | null
          updated_at: string | null
          verification_status: string | null
          website_url: string | null
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string | null
          description?: string | null
          employee_count?: string | null
          founded_year?: number | null
          funding_info?: Json | null
          headquarters?: string | null
          id?: string
          logo_url?: string | null
          name: string
          social_links?: Json | null
          trust_score?: number | null
          updated_at?: string | null
          verification_status?: string | null
          website_url?: string | null
        }
        Update: {
          contact_info?: Json | null
          created_at?: string | null
          description?: string | null
          employee_count?: string | null
          founded_year?: number | null
          funding_info?: Json | null
          headquarters?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          social_links?: Json | null
          trust_score?: number | null
          updated_at?: string | null
          verification_status?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      api_ratings: {
        Row: {
          api_id: string | null
          cons: string[] | null
          created_at: string | null
          experience_level: string | null
          id: string
          pros: string[] | null
          rating: number
          review: string | null
          updated_at: string | null
          use_case: string | null
          user_id: string | null
          would_recommend: boolean | null
        }
        Insert: {
          api_id?: string | null
          cons?: string[] | null
          created_at?: string | null
          experience_level?: string | null
          id?: string
          pros?: string[] | null
          rating: number
          review?: string | null
          updated_at?: string | null
          use_case?: string | null
          user_id?: string | null
          would_recommend?: boolean | null
        }
        Update: {
          api_id?: string | null
          cons?: string[] | null
          created_at?: string | null
          experience_level?: string | null
          id?: string
          pros?: string[] | null
          rating?: number
          review?: string | null
          updated_at?: string | null
          use_case?: string | null
          user_id?: string | null
          would_recommend?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "api_ratings_api_id_fkey"
            columns: ["api_id"]
            isOneToOne: false
            referencedRelation: "apis"
            referencedColumns: ["id"]
          },
        ]
      }
      api_relationships: {
        Row: {
          api_id: string | null
          created_at: string | null
          description: string | null
          id: string
          related_api_id: string | null
          relationship_type: string
          strength: number | null
        }
        Insert: {
          api_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          related_api_id?: string | null
          relationship_type: string
          strength?: number | null
        }
        Update: {
          api_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          related_api_id?: string | null
          relationship_type?: string
          strength?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "api_relationships_api_id_fkey"
            columns: ["api_id"]
            isOneToOne: false
            referencedRelation: "apis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_relationships_related_api_id_fkey"
            columns: ["related_api_id"]
            isOneToOne: false
            referencedRelation: "apis"
            referencedColumns: ["id"]
          },
        ]
      }
      api_tags: {
        Row: {
          api_id: string | null
          confidence_score: number | null
          created_at: string | null
          id: string
          name: string
          tag_type: string | null
        }
        Insert: {
          api_id?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          name: string
          tag_type?: string | null
        }
        Update: {
          api_id?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          name?: string
          tag_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_tags_api_id_fkey"
            columns: ["api_id"]
            isOneToOne: false
            referencedRelation: "apis"
            referencedColumns: ["id"]
          },
        ]
      }
      apis: {
        Row: {
          api_type: string | null
          auth_type: string
          auto_discovered: boolean | null
          avg_response_time: number | null
          category_id: string | null
          changelog_url: string | null
          created_at: string | null
          description: string
          discovery_date: string | null
          discovery_source: string | null
          documentation_url: string | null
          endpoint: string
          error_rate: number | null
          headers: Json | null
          id: string
          last_health_check: string | null
          last_updated: string | null
          methods: string[] | null
          name: string
          openapi_spec_url: string | null
          popularity: number | null
          pricing_free: boolean | null
          pricing_free_tier: string | null
          pricing_paid_plans: string | null
          privacy_policy_url: string | null
          provider_id: string | null
          rate_limit: string | null
          response_formats: string[] | null
          sdk_available: boolean | null
          sdk_languages: string[] | null
          search_vector: unknown | null
          status: string
          support_email: string | null
          support_url: string | null
          supported_languages: string[] | null
          swagger_version: string | null
          terms_of_service_url: string | null
          updated_at: string | null
          uptime_percentage: number | null
          verification_status: string | null
          version: string | null
        }
        Insert: {
          api_type?: string | null
          auth_type?: string
          auto_discovered?: boolean | null
          avg_response_time?: number | null
          category_id?: string | null
          changelog_url?: string | null
          created_at?: string | null
          description: string
          discovery_date?: string | null
          discovery_source?: string | null
          documentation_url?: string | null
          endpoint: string
          error_rate?: number | null
          headers?: Json | null
          id?: string
          last_health_check?: string | null
          last_updated?: string | null
          methods?: string[] | null
          name: string
          openapi_spec_url?: string | null
          popularity?: number | null
          pricing_free?: boolean | null
          pricing_free_tier?: string | null
          pricing_paid_plans?: string | null
          privacy_policy_url?: string | null
          provider_id?: string | null
          rate_limit?: string | null
          response_formats?: string[] | null
          sdk_available?: boolean | null
          sdk_languages?: string[] | null
          search_vector?: unknown | null
          status?: string
          support_email?: string | null
          support_url?: string | null
          supported_languages?: string[] | null
          swagger_version?: string | null
          terms_of_service_url?: string | null
          updated_at?: string | null
          uptime_percentage?: number | null
          verification_status?: string | null
          version?: string | null
        }
        Update: {
          api_type?: string | null
          auth_type?: string
          auto_discovered?: boolean | null
          avg_response_time?: number | null
          category_id?: string | null
          changelog_url?: string | null
          created_at?: string | null
          description?: string
          discovery_date?: string | null
          discovery_source?: string | null
          documentation_url?: string | null
          endpoint?: string
          error_rate?: number | null
          headers?: Json | null
          id?: string
          last_health_check?: string | null
          last_updated?: string | null
          methods?: string[] | null
          name?: string
          openapi_spec_url?: string | null
          popularity?: number | null
          pricing_free?: boolean | null
          pricing_free_tier?: string | null
          pricing_paid_plans?: string | null
          privacy_policy_url?: string | null
          provider_id?: string | null
          rate_limit?: string | null
          response_formats?: string[] | null
          sdk_available?: boolean | null
          sdk_languages?: string[] | null
          search_vector?: unknown | null
          status?: string
          support_email?: string | null
          support_url?: string | null
          supported_languages?: string[] | null
          swagger_version?: string | null
          terms_of_service_url?: string | null
          updated_at?: string | null
          uptime_percentage?: number | null
          verification_status?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "apis_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "api_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apis_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "api_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      character_assets: {
        Row: {
          asset_data: Json | null
          asset_type: string
          asset_url: string | null
          character_id: string
          created_at: string
          generation_parameters: Json | null
          id: string
          quality_score: number | null
        }
        Insert: {
          asset_data?: Json | null
          asset_type: string
          asset_url?: string | null
          character_id: string
          created_at?: string
          generation_parameters?: Json | null
          id?: string
          quality_score?: number | null
        }
        Update: {
          asset_data?: Json | null
          asset_type?: string
          asset_url?: string | null
          character_id?: string
          created_at?: string
          generation_parameters?: Json | null
          id?: string
          quality_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "character_assets_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      characters: {
        Row: {
          age_range: string | null
          created_at: string
          description: string | null
          ethnicity: string | null
          gender: string | null
          id: string
          name: string
          personality_traits: string[] | null
          style: string | null
          updated_at: string
          user_id: string | null
          visual_dna: Json | null
          voice_type: string | null
        }
        Insert: {
          age_range?: string | null
          created_at?: string
          description?: string | null
          ethnicity?: string | null
          gender?: string | null
          id?: string
          name: string
          personality_traits?: string[] | null
          style?: string | null
          updated_at?: string
          user_id?: string | null
          visual_dna?: Json | null
          voice_type?: string | null
        }
        Update: {
          age_range?: string | null
          created_at?: string
          description?: string | null
          ethnicity?: string | null
          gender?: string | null
          id?: string
          name?: string
          personality_traits?: string[] | null
          style?: string | null
          updated_at?: string
          user_id?: string | null
          visual_dna?: Json | null
          voice_type?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          metadata: Json | null
          rag_sources: Json | null
          response_time: number | null
          role: string
          search_query: string | null
          session_id: string | null
          suggested_apis: string[] | null
          tokens_used: number | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          rag_sources?: Json | null
          response_time?: number | null
          role: string
          search_query?: string | null
          session_id?: string | null
          suggested_apis?: string[] | null
          tokens_used?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          rag_sources?: Json | null
          response_time?: number | null
          role?: string
          search_query?: string | null
          session_id?: string | null
          suggested_apis?: string[] | null
          tokens_used?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      crawled_content: {
        Row: {
          apis_extracted: Json | null
          content: string | null
          content_type: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          processing_status: string | null
          session_id: string | null
          title: string | null
          url: string
        }
        Insert: {
          apis_extracted?: Json | null
          content?: string | null
          content_type?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          processing_status?: string | null
          session_id?: string | null
          title?: string | null
          url: string
        }
        Update: {
          apis_extracted?: Json | null
          content?: string | null
          content_type?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          processing_status?: string | null
          session_id?: string | null
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "crawled_content_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "web_crawl_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_base: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          content_type: string | null
          created_at: string | null
          downvotes: number | null
          id: string
          is_featured: boolean | null
          related_apis: string[] | null
          search_vector: unknown | null
          tags: string[] | null
          title: string
          updated_at: string | null
          upvotes: number | null
          view_count: number | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          content_type?: string | null
          created_at?: string | null
          downvotes?: number | null
          id?: string
          is_featured?: boolean | null
          related_apis?: string[] | null
          search_vector?: unknown | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          upvotes?: number | null
          view_count?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          content_type?: string | null
          created_at?: string | null
          downvotes?: number | null
          id?: string
          is_featured?: boolean | null
          related_apis?: string[] | null
          search_vector?: unknown | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          upvotes?: number | null
          view_count?: number | null
        }
        Relationships: []
      }
      search_queries: {
        Row: {
          clicked_results: string[] | null
          created_at: string | null
          filters_applied: Json | null
          id: string
          query: string
          query_type: string | null
          response_time: number | null
          results_count: number | null
          satisfaction_score: number | null
          user_id: string | null
        }
        Insert: {
          clicked_results?: string[] | null
          created_at?: string | null
          filters_applied?: Json | null
          id?: string
          query: string
          query_type?: string | null
          response_time?: number | null
          results_count?: number | null
          satisfaction_score?: number | null
          user_id?: string | null
        }
        Update: {
          clicked_results?: string[] | null
          created_at?: string | null
          filters_applied?: Json | null
          id?: string
          query?: string
          query_type?: string | null
          response_time?: number | null
          results_count?: number | null
          satisfaction_score?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_api_subscriptions: {
        Row: {
          api_id: string | null
          api_key_encrypted: string | null
          auto_renew: boolean | null
          billing_cycle_end: string | null
          billing_cycle_start: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          subscription_tier: string | null
          updated_at: string | null
          usage_current: number | null
          usage_quota: number | null
          user_id: string
        }
        Insert: {
          api_id?: string | null
          api_key_encrypted?: string | null
          auto_renew?: boolean | null
          billing_cycle_end?: string | null
          billing_cycle_start?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          subscription_tier?: string | null
          updated_at?: string | null
          usage_current?: number | null
          usage_quota?: number | null
          user_id: string
        }
        Update: {
          api_id?: string | null
          api_key_encrypted?: string | null
          auto_renew?: boolean | null
          billing_cycle_end?: string | null
          billing_cycle_start?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          subscription_tier?: string | null
          updated_at?: string | null
          usage_current?: number | null
          usage_quota?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_api_subscriptions_api_id_fkey"
            columns: ["api_id"]
            isOneToOne: false
            referencedRelation: "apis"
            referencedColumns: ["id"]
          },
        ]
      }
      user_api_tests: {
        Row: {
          api_id: string | null
          body: string | null
          created_at: string | null
          endpoint: string
          endpoint_id: string | null
          headers: Json | null
          id: string
          is_favorite: boolean | null
          method: string
          response_data: Json | null
          response_headers: Json | null
          response_status: number | null
          response_time: number | null
          test_collection: string | null
          test_name: string | null
          user_id: string | null
        }
        Insert: {
          api_id?: string | null
          body?: string | null
          created_at?: string | null
          endpoint: string
          endpoint_id?: string | null
          headers?: Json | null
          id?: string
          is_favorite?: boolean | null
          method: string
          response_data?: Json | null
          response_headers?: Json | null
          response_status?: number | null
          response_time?: number | null
          test_collection?: string | null
          test_name?: string | null
          user_id?: string | null
        }
        Update: {
          api_id?: string | null
          body?: string | null
          created_at?: string | null
          endpoint?: string
          endpoint_id?: string | null
          headers?: Json | null
          id?: string
          is_favorite?: boolean | null
          method?: string
          response_data?: Json | null
          response_headers?: Json | null
          response_status?: number | null
          response_time?: number | null
          test_collection?: string | null
          test_name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_api_tests_api_id_fkey"
            columns: ["api_id"]
            isOneToOne: false
            referencedRelation: "apis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_api_tests_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "api_endpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          api_usage_level: string | null
          created_at: string | null
          dashboard_layout: Json | null
          favorite_categories: string[] | null
          id: string
          notification_settings: Json | null
          preferred_languages: string[] | null
          search_history: string[] | null
          theme: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          api_usage_level?: string | null
          created_at?: string | null
          dashboard_layout?: Json | null
          favorite_categories?: string[] | null
          id?: string
          notification_settings?: Json | null
          preferred_languages?: string[] | null
          search_history?: string[] | null
          theme?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          api_usage_level?: string | null
          created_at?: string | null
          dashboard_layout?: Json | null
          favorite_categories?: string[] | null
          id?: string
          notification_settings?: Json | null
          preferred_languages?: string[] | null
          search_history?: string[] | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      web_crawl_sessions: {
        Row: {
          apis_discovered: number | null
          completed_at: string | null
          crawl_depth: number | null
          crawl_rules: Json | null
          created_at: string | null
          error_log: string[] | null
          id: string
          pages_crawled: number | null
          session_name: string
          started_at: string | null
          status: string | null
          target_urls: string[]
        }
        Insert: {
          apis_discovered?: number | null
          completed_at?: string | null
          crawl_depth?: number | null
          crawl_rules?: Json | null
          created_at?: string | null
          error_log?: string[] | null
          id?: string
          pages_crawled?: number | null
          session_name: string
          started_at?: string | null
          status?: string | null
          target_urls: string[]
        }
        Update: {
          apis_discovered?: number | null
          completed_at?: string | null
          crawl_depth?: number | null
          crawl_rules?: Json | null
          created_at?: string | null
          error_log?: string[] | null
          id?: string
          pages_crawled?: number | null
          session_name?: string
          started_at?: string | null
          status?: string | null
          target_urls?: string[]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
