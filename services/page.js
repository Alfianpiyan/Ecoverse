import { supabase } from "@/lib/Supabaseclient";
import bcrypt from "bcryptjs";

// FETCH ROLE USER
export async function fetchUserRoleAndDetail(email) {
  const { data, error } = await supabase
    .from("users")
    .select("jenis_akun, nama_instansi")
    .eq("email", email)
    .maybeSingle();

  if (error || !data) throw new Error("Role pengguna tidak ditemukan.");

  return {
    role: data.jenis_akun?.toLowerCase(),
    nama: data.nama_instansi,
  };
}

// LOGIN ADMIN
export async function loginAdmin(email, password) {
  const { data } = await supabase
    .from("admin")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (!data) return false;

  const isValid = data.password.startsWith("$2")
    ? await bcrypt.compare(password, data.password)
    : password === data.password;

  if (!isValid) throw new Error("Password admin salah!");

  return true;
}

// LOGIN USER
export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data?.user) throw new Error("Email atau password salah!");

  return data.user;
}
