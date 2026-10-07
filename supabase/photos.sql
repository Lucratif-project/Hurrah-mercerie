-- ============================================================
-- Vague 7 : stockage des photos (Supabase Storage)
-- À exécuter dans Supabase > SQL Editor, après securite.sql.
-- Relançable sans risque.
--
-- Crée le dossier public « images » : tout le monde peut VOIR les photos,
-- seuls les administrateurs peuvent en ajouter, remplacer ou supprimer.
-- Formats acceptés : JPEG, PNG, WebP. 5 Mo maximum par photo
-- (le site réduit déjà les photos de téléphone avant l'envoi).
-- ============================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('images', 'images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists hm_images_admin_insert on storage.objects;
drop policy if exists hm_images_admin_update on storage.objects;
drop policy if exists hm_images_admin_delete on storage.objects;

create policy hm_images_admin_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'images' and public.is_admin());

create policy hm_images_admin_update on storage.objects
  for update to authenticated
  using (bucket_id = 'images' and public.is_admin())
  with check (bucket_id = 'images' and public.is_admin());

create policy hm_images_admin_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'images' and public.is_admin());

-- Pas de règle de lecture : un dossier « public » sert déjà les photos
-- par leur adresse, sans permettre de lister tout le contenu.
