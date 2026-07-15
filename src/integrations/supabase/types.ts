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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      daily_statistics: {
        Row: {
          break_minutes: number
          completed_sessions: number
          completed_tasks: number
          created_at: string
          date: string
          focus_minutes: number
          id: string
          interrupted_sessions: number
          updated_at: string
          user_id: string
        }
        Insert: {
          break_minutes?: number
          completed_sessions?: number
          completed_tasks?: number
          created_at?: string
          date: string
          focus_minutes?: number
          id?: string
          interrupted_sessions?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          break_minutes?: number
          completed_sessions?: number
          completed_tasks?: number
          created_at?: string
          date?: string
          focus_minutes?: number
          id?: string
          interrupted_sessions?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      monthly_statistics: {
        Row: {
          completed_sessions: number
          completed_tasks: number
          created_at: string
          focus_minutes: number
          id: string
          month: number
          updated_at: string
          user_id: string
          year: number
        }
        Insert: {
          completed_sessions?: number
          completed_tasks?: number
          created_at?: string
          focus_minutes?: number
          id?: string
          month: number
          updated_at?: string
          user_id: string
          year: number
        }
        Update: {
          completed_sessions?: number
          completed_tasks?: number
          created_at?: string
          focus_minutes?: number
          id?: string
          month?: number
          updated_at?: string
          user_id?: string
          year?: number
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_read: boolean
          message: string | null
          read_at: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean
          message?: string | null
          read_at?: string | null
          title: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean
          message?: string | null
          read_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: []
      }
      pomodoro_cycles: {
        Row: {
          completed_sessions: number
          created_at: string
          cycle_number: number
          ended_at: string | null
          id: string
          started_at: string
          user_id: string
        }
        Insert: {
          completed_sessions?: number
          created_at?: string
          cycle_number: number
          ended_at?: string | null
          id?: string
          started_at?: string
          user_id: string
        }
        Update: {
          completed_sessions?: number
          created_at?: string
          cycle_number?: number
          ended_at?: string | null
          id?: string
          started_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pomodoro_sessions: {
        Row: {
          completed: boolean
          created_at: string
          cycle_id: string | null
          duration_seconds: number
          ended_at: string | null
          id: string
          interrupted: boolean
          notes: string | null
          session_type: Database["public"]["Enums"]["pomodoro_session_type"]
          started_at: string
          task_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          cycle_id?: string | null
          duration_seconds: number
          ended_at?: string | null
          id?: string
          interrupted?: boolean
          notes?: string | null
          session_type?: Database["public"]["Enums"]["pomodoro_session_type"]
          started_at?: string
          task_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          cycle_id?: string | null
          duration_seconds?: number
          ended_at?: string | null
          id?: string
          interrupted?: boolean
          notes?: string | null
          session_type?: Database["public"]["Enums"]["pomodoro_session_type"]
          started_at?: string
          task_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pomodoro_sessions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          language: string | null
          last_login_at: string | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          language?: string | null
          last_login_at?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          language?: string | null
          last_login_at?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sync_queue: {
        Row: {
          client_updated_at: string
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          last_error: string | null
          operation_type: Database["public"]["Enums"]["sync_operation_type"]
          payload: Json
          retry_count: number
          sync_status: Database["public"]["Enums"]["sync_status_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          client_updated_at?: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          last_error?: string | null
          operation_type: Database["public"]["Enums"]["sync_operation_type"]
          payload?: Json
          retry_count?: number
          sync_status?: Database["public"]["Enums"]["sync_status_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          client_updated_at?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          last_error?: string | null
          operation_type?: Database["public"]["Enums"]["sync_operation_type"]
          payload?: Json
          retry_count?: number
          sync_status?: Database["public"]["Enums"]["sync_status_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      task_categories: {
        Row: {
          color: string
          created_at: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      task_tag_relations: {
        Row: {
          created_at: string
          tag_id: string
          task_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          tag_id: string
          task_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          tag_id?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_tag_relations_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "task_tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_tag_relations_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_tags: {
        Row: {
          color: string | null
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          category_id: string | null
          completed_at: string | null
          completed_pomodoros: number | null
          created_at: string
          description: string | null
          due_date: string | null
          estimated_pomodoros: number | null
          id: string
          notes: string | null
          position: number | null
          priority: Database["public"]["Enums"]["task_priority"]
          status: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category_id?: string | null
          completed_at?: string | null
          completed_pomodoros?: number | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          estimated_pomodoros?: number | null
          id?: string
          notes?: string | null
          position?: number | null
          priority?: Database["public"]["Enums"]["task_priority"]
          status?: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category_id?: string | null
          completed_at?: string | null
          completed_pomodoros?: number | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          estimated_pomodoros?: number | null
          id?: string
          notes?: string | null
          position?: number | null
          priority?: Database["public"]["Enums"]["task_priority"]
          status?: Database["public"]["Enums"]["task_status"]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "task_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          auto_start_breaks: boolean
          auto_start_pomodoros: boolean
          created_at: string
          extra: Json
          language: string
          long_break_duration_minutes: number
          notifications_enabled: boolean
          pomodoro_duration_minutes: number
          sessions_until_long_break: number
          short_break_duration_minutes: number
          sound_enabled: boolean
          theme: string
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_start_breaks?: boolean
          auto_start_pomodoros?: boolean
          created_at?: string
          extra?: Json
          language?: string
          long_break_duration_minutes?: number
          notifications_enabled?: boolean
          pomodoro_duration_minutes?: number
          sessions_until_long_break?: number
          short_break_duration_minutes?: number
          sound_enabled?: boolean
          theme?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_start_breaks?: boolean
          auto_start_pomodoros?: boolean
          created_at?: string
          extra?: Json
          language?: string
          long_break_duration_minutes?: number
          notifications_enabled?: boolean
          pomodoro_duration_minutes?: number
          sessions_until_long_break?: number
          short_break_duration_minutes?: number
          sound_enabled?: boolean
          theme?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      weekly_statistics: {
        Row: {
          completed_sessions: number
          completed_tasks: number
          created_at: string
          focus_minutes: number
          id: string
          updated_at: string
          user_id: string
          week: number
          year: number
        }
        Insert: {
          completed_sessions?: number
          completed_tasks?: number
          created_at?: string
          focus_minutes?: number
          id?: string
          updated_at?: string
          user_id: string
          week: number
          year: number
        }
        Update: {
          completed_sessions?: number
          completed_tasks?: number
          created_at?: string
          focus_minutes?: number
          id?: string
          updated_at?: string
          user_id?: string
          week?: number
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      notification_type: "info" | "success" | "warning" | "error" | "reminder"
      pomodoro_session_type: "focus" | "short_break" | "long_break"
      sync_operation_type: "insert" | "update" | "delete"
      sync_status_type: "pending" | "syncing" | "completed" | "failed"
      task_priority: "low" | "medium" | "high" | "urgent"
      task_status: "pending" | "in_progress" | "completed" | "archived"
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
    Enums: {
      notification_type: ["info", "success", "warning", "error", "reminder"],
      pomodoro_session_type: ["focus", "short_break", "long_break"],
      sync_operation_type: ["insert", "update", "delete"],
      sync_status_type: ["pending", "syncing", "completed", "failed"],
      task_priority: ["low", "medium", "high", "urgent"],
      task_status: ["pending", "in_progress", "completed", "archived"],
    },
  },
} as const
