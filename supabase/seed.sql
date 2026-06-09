-- =============================================
-- La Fábrica de Sonrisas — Seed para Vercel Postgres / Neon
-- Ejecutar en: Vercel Dashboard → Storage → [tu DB] → Query
-- =============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS treatments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descripcion_corta TEXT NOT NULL,
  descripcion_larga TEXT NOT NULL,
  para_quien TEXT NOT NULL DEFAULT '',
  duracion TEXT NOT NULL DEFAULT '',
  precio_min INTEGER NOT NULL DEFAULT 0,
  precio_max INTEGER NOT NULL DEFAULT 0,
  unidad TEXT NOT NULL DEFAULT 'tratamiento',
  es_precio_real BOOLEAN NOT NULL DEFAULT false,
  visible BOOLEAN NOT NULL DEFAULT true,
  orden INTEGER NOT NULL DEFAULT 0,
  faq JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  mensaje TEXT,
  origen TEXT NOT NULL,
  resumen_presupuesto JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  demo BOOLEAN NOT NULL DEFAULT true
);

-- Limpiar datos previos (útil para re-ejecutar el seed)
TRUNCATE treatments;

INSERT INTO treatments (slug, nombre, categoria, descripcion_corta, descripcion_larga, para_quien, duracion, precio_min, precio_max, unidad, es_precio_real, visible, orden, faq) VALUES

('brackets-metalicos', 'Ortodoncia con brackets metálicos', 'ortodoncia',
 'La ortodoncia clásica, renovada. Brackets de última generación para corregir la posición de tus dientes.',
 'Los brackets metálicos son la opción más consolidada en ortodoncia. Hoy son mucho más pequeños, cómodos y eficaces que los de antes.',
 'Ideal para adolescentes y adultos que buscan una solución eficaz a un precio equilibrado.',
 '12–24 meses', 1800, 3200, 'tratamiento', false, true, 10,
 '[{"pregunta":"¿Duele ponerse los brackets?","respuesta":"Los brackets no duelen al colocarlos. Los primeros días notas presión y algo de molestia, que desaparece con un analgésico suave."},{"pregunta":"¿Puedo comer de todo?","respuesta":"Mejor evitar alimentos muy duros o pegajosos. El resto, sin problema."}]'::jsonb),

('ortodoncia-invisible', 'Ortodoncia invisible (alineadores)', 'ortodoncia',
 'Alineadores transparentes removibles. Corriges tu sonrisa sin que nadie lo note.',
 'Los alineadores invisibles son férulas de plástico transparente que mueven los dientes de forma gradual y casi imperceptible. Se cambian cada 1–2 semanas.',
 'Para quien quiere discreción total. Especialmente popular entre adultos y profesionales.',
 '6–18 meses', 2500, 4500, 'tratamiento', false, true, 11,
 '[{"pregunta":"¿Es tan eficaz como los brackets?","respuesta":"Para casos leves y moderados, la eficacia es comparable."},{"pregunta":"¿Hay que llevarlos todo el día?","respuesta":"Se recomiendan 20–22 horas diarias."}]'::jsonb),

('implante-unitario', 'Implante dental unitario', 'implantes',
 'Repón una pieza perdida con un implante que se ve, se siente y funciona como un diente natural.',
 'Un implante dental es una raíz artificial de titanio. Sobre él se coloca una corona de porcelana personalizada.',
 'Para cualquier persona que haya perdido uno o varios dientes.',
 '3–6 meses', 1200, 2000, 'pieza', false, true, 20,
 '[{"pregunta":"¿Duele la operación?","respuesta":"Se realiza con anestesia local. No sientes dolor."},{"pregunta":"¿Cuánto dura un implante?","respuesta":"Con buena higiene, puede durar décadas."}]'::jsonb),

('implantes-multiples', 'Implantes múltiples', 'implantes',
 'Cuando necesitas reponer varias piezas, los implantes múltiples son la solución más estable.',
 'Si has perdido varios dientes, valoramos diferentes soluciones según el estado de tu hueso.',
 'Para quienes han perdido varios dientes y quieren una solución fija.',
 'Según planificación individual', 2500, 6000, 'tratamiento', false, true, 21, '[]'::jsonb),

('blanqueamiento-dental', 'Blanqueamiento dental profesional', 'estetica',
 'Recupera el blanco natural de tus dientes en una sola sesión o con el cómodo sistema en casa.',
 'El blanqueamiento profesional aclara el tono de tus dientes de forma segura y controlada.',
 'Para quien tiene los dientes manchados por café, té o tabaco.',
 '1 sesión (clínica) o 2–3 semanas (domiciliario)', 200, 400, 'tratamiento', false, true, 30,
 '[{"pregunta":"¿Daña el esmalte?","respuesta":"No, si está bien indicado. Puede haber sensibilidad temporal."},{"pregunta":"¿Funciona en coronas o carillas?","respuesta":"Solo actúa sobre dientes naturales."}]'::jsonb),

('carillas-porcelana', 'Carillas de porcelana', 'estetica',
 'Transforma tu sonrisa de forma permanente con carillas ultrafinas de porcelana.',
 'Las carillas son láminas muy finas de porcelana que se adhieren a la cara visible del diente.',
 'Para quien quiere un cambio estético significativo y duradero.',
 '2–3 sesiones', 600, 1200, 'pieza', false, true, 31, '[]'::jsonb),

('composite-estetico', 'Composite estético', 'estetica',
 'Mejora tu sonrisa sin tocar el diente: el composite se aplica directamente sobre el esmalte.',
 'El composite es una resina de alta estética que el odontólogo modela directamente sobre el diente.',
 'Ideal para corregir pequeñas fracturas o irregularidades leves.',
 '1 sesión por diente', 150, 350, 'pieza', false, true, 32, '[]'::jsonb),

('tratamiento-periodontal', 'Tratamiento periodontal', 'periodoncia',
 'Combatimos la periodontitis para salvar tus dientes y tu salud general.',
 'El tratamiento elimina las bacterias de las bolsas periodontales mediante raspado y alisado radicular.',
 'Para quien tiene sangrado de encías persistente, encías retraídas o movilidad dental.',
 '2–4 sesiones', 200, 600, 'tratamiento', false, true, 40, '[]'::jsonb),

('extraccion-muela-juicio', 'Extracción de muela del juicio', 'cirugia',
 'Extracción de muelas del juicio incluidas o erupcionadas, con la mayor comodidad posible.',
 'Se realiza bajo anestesia local. Para casos complejos se puede utilizar sedación consciente.',
 'Para quien tiene las muelas del juicio retenidas o que causan molestias.',
 '30–60 min por pieza', 180, 400, 'pieza', false, true, 50, '[]'::jsonb),

('cirugia-osea', 'Cirugía de regeneración ósea', 'cirugia',
 'Recuperamos el hueso perdido para que los implantes tengan la base que necesitan.',
 'Se utilizan membranas y materiales de relleno que estimulan la formación de nuevo hueso.',
 'Indicado como paso previo a la implantología en casos con deficiencia ósea.',
 'Según extensión', 400, 1200, 'tratamiento', false, true, 51, '[]'::jsonb),

('revision-diagnostico', 'Revisión y diagnóstico completo', 'general',
 'Tu punto de partida: exploramos tu boca y te lo explicamos sin tecnicismos.',
 'Primera visita con exploración completa y diagnóstico detallado en lenguaje claro. Sin sorpresas.',
 'Para cualquier persona. Primera visita gratuita.',
 '30–45 minutos', 0, 0, 'sesion', false, true, 61,
 '[{"pregunta":"¿La primera visita es gratuita?","respuesta":"Sí, sin coste y sin compromiso."}]'::jsonb),

('limpieza-bucal', 'Limpieza dental profesional', 'general',
 'La limpieza que marca la diferencia. Eliminamos el sarro y dejamos tu boca a punto.',
 'Elimina el sarro y la placa que el cepillo no alcanza. Incluye pulido y fluorización.',
 'Para todo el mundo como mantenimiento preventivo.',
 '45–60 minutos', 50, 80, 'sesion', false, true, 62,
 '[{"pregunta":"¿Con qué frecuencia debo hacerme una limpieza?","respuesta":"Al menos una vez al año, o cada 6 meses si hay antecedentes de periodontitis."}]'::jsonb),

('empaste', 'Empaste dental (composite)', 'general',
 'Tratamos la caries y restauramos el diente con composite del color exacto de tus dientes.',
 'Extraemos el tejido dañado y rellenamos con composite del color de tus dientes. En una sola visita.',
 'Para cualquier persona con caries diagnosticada.',
 '30–60 minutos', 50, 120, 'pieza', false, true, 63,
 '[{"pregunta":"¿Se nota el empaste?","respuesta":"Con los composites actuales, el empaste queda del color exacto de tu diente."}]'::jsonb),

('endodoncia', 'Endodoncia (tratamiento de conductos)', 'general',
 'Salvamos el diente cuando la caries o una infección han llegado hasta el nervio.',
 'Limpiamos el interior del diente y lo sellamos. Permite conservar el diente en la boca.',
 'Cuando hay infección profunda o dolor espontáneo nocturno.',
 '1–3 sesiones', 200, 450, 'pieza', false, true, 64, '[]'::jsonb),

('corona-dental', 'Corona dental', 'general',
 'Una funda que reconstruye y protege un diente muy dañado.',
 'Una corona de cerámica o zirconio cubre el diente para protegerlo. Indistinguible de un diente natural.',
 'Para dientes fracturados, muy desgastados o tratados de endodoncia.',
 '2–3 sesiones', 500, 950, 'pieza', false, true, 65, '[]'::jsonb),

('revision-infantil', 'Revisión infantil', 'odontopediatria',
 'La primera visita de los peques: sin miedo, con paciencia y con mucho cariño.',
 'Somos especialmente cuidadosas con los más pequeños. Explicamos todo en su lenguaje.',
 'Para niños desde la erupción de los primeros dientes de leche.',
 '30 minutos', 0, 40, 'sesion', false, true, 70,
 '[{"pregunta":"¿A qué edad llevar al niño por primera vez?","respuesta":"Recomendamos la primera visita alrededor del año de edad."}]'::jsonb),

('selladores-fisuras', 'Selladores de fisuras', 'odontopediatria',
 'Protección preventiva para los dientes definitivos: evitamos la caries antes de que llegue.',
 'Una resina en las fisuras de los molares definitivos recién erupcionados. Rápido y sin anestesia.',
 'Para niños de 6–12 años con molares definitivos recién erupcionados.',
 '15–20 min por cuadrante', 30, 60, 'pieza', false, true, 71, '[]'::jsonb),

('ortodoncia-infantil', 'Ortodoncia interceptiva infantil', 'odontopediatria',
 'Corregimos a tiempo los problemas que, si se tratan pronto, se resuelven con más facilidad.',
 'Actúa sobre los maxilares en crecimiento. Puede reducir la necesidad de ortodoncia fija.',
 'Para niños entre 6 y 12 años con problemas de mordida o apiñamiento severo.',
 '12–24 meses', 800, 1800, 'tratamiento', false, true, 72, '[]'::jsonb);
