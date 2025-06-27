"use server";

import { createServerClient } from "node_modules/@supabase/ssr/dist/main";
import {
  createServerSupabaseAdminClient,
  createServerSupabaseClient,
} from "utils/supabase/server";

export async function getAllUsers() {
  const supabse = await createServerSupabaseAdminClient();
  const { data, error } = await supabse.auth.admin.listUsers();
  if (error) {
    return [];
  }
  return data.users;
}

export async function getUserById(userId) {
  const supabase = await createServerSupabaseAdminClient();
  const { data, error } = await supabase.auth.admin.getUserById(userId);
  if (error) {
    return null;
  }
  return data.user;
}


