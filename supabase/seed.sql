-- =============================================
-- La Fábrica de Sonrisas — Supabase Seed
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLES
-- =============================================

CREATE TABLE IF NOT EXISTS treatments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  categoria TEXT NOT NULL CHECK (categoria IN ('ortodoncia','implantes','estetica','periodoncia','cirugia','general','odontopediatria')),
  descripcion_corta TEXT NOT NULL,
  descripcion_larga TEXT NOT NULL,
  para_quien TEXT NOT NULL DEFAULT '',
  duracion TEXT NOT NULL DEFAULT '',
  precio_min INTEGER NOT NULL DEFAULT 0,
  precio_max INTEGER NOT NULL DEFAULT 0,
  unidad TEXT NOT NULL CHECK (unidad IN ('pieza','arcada','sesion','tratamiento')) DEFAULT 'tratamiento',
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
  origen TEXT NOT NULL CHECK (origen IN ('presupuestador','cita','contacto')),
  resumen_presupuesto JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  demo BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS budget_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  objetivo TEXT NOT NULL,
  pregunta TEXT NOT NULL,
  descripcion TEXT,
  tipo TEXT NOT NULL DEFAULT 'select',
  orden INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS budget_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES budget_questions(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  emoji TEXT,
  siguiente_pregunta_id UUID,
  tratamientos_slugs TEXT[] DEFAULT '{}',
  multiplicador NUMERIC DEFAULT 1,
  orden INTEGER NOT NULL DEFAULT 0
);

-- =============================================
-- TREATMENTS SEED (~18 tratamientos)
-- =============================================

INSERT INTO treatments (slug, nombre, categoria, descripcion_corta, descripcion_larga, para_quien, duracion, precio_min, precio_max, unidad, es_precio_real, visible, orden, faq) VALUES

-- ORTODONCIA
('brackets-metalicos', 'Ortodoncia con brackets metálicos', 'ortodoncia',
 'La ortodoncia clásica, renovada. Brackets de última generación para corregir la posición de tus dientes.',
 'Los brackets metálicos son la opción más consolidada en ortodoncia. Hoy son mucho más pequeños, cómodos y eficaces que los de antes. Corrigen desde leves apiñamientos hasta maloclusiones complejas, con resultados predecibles y duraderos.',
 'Ideal para adolescentes y adultos que buscan una solución eficaz a un precio equilibrado.',
 '12–24 meses',
 1800, 3200, 'tratamiento', false, true, 10,
 '[{"pregunta":"¿Duele ponerse los brackets?","respuesta":"Los brackets no duelen al colocarlos. Los primeros días notas presión y algo de molestia, que desaparece con un analgésico suave. Con el tiempo, ni los notas."},{"pregunta":"¿Puedo comer de todo?","respuesta":"Mejor evitar alimentos muy duros o pegajosos (caramelos, zanahoria cruda, palomitas). El resto, sin problema."}]'::jsonb),

('ortodoncia-invisible', 'Ortodoncia invisible (alineadores)', 'ortodoncia',
 'Alineadores transparentes removibles. Corriges tu sonrisa sin que nadie lo note.',
 'Los alineadores invisibles son férulas de plástico transparente que mueven los dientes de forma gradual y casi imperceptible. Se cambian cada 1–2 semanas. Se retiran para comer y cepillarse, lo que facilita mucho la higiene. En La Fábrica de Sonrisas trabajamos con los sistemas más avanzados del mercado.',
 'Para quien quiere discreción total. Especialmente popular entre adultos y profesionales.',
 '6–18 meses',
 2500, 4500, 'tratamiento', false, true, 11,
 '[{"pregunta":"¿Es tan eficaz como los brackets?","respuesta":"Para casos leves y moderados, la eficacia es comparable. Para casos complejos, el ortodoncista valorará cuál es la mejor opción en tu caso."},{"pregunta":"¿Hay que llevarlos todo el día?","respuesta":"Se recomiendan 20–22 horas diarias. Se retiran solo para comer y cepillarse."}]'::jsonb),

-- IMPLANTES
('implante-unitario', 'Implante dental unitario', 'implantes',
 'Repón una pieza perdida con un implante que se ve, se siente y funciona como un diente natural.',
 'Un implante dental es una raíz artificial de titanio que se coloca en el hueso de la mandíbula o el maxilar. Sobre él se coloca una corona de porcelana personalizada. Es la solución más parecida a tener un diente natural: no afecta a los dientes vecinos y puede durar toda la vida con el cuidado adecuado.',
 'Para cualquier persona que haya perdido uno o varios dientes y tenga suficiente hueso (o pueda regenerarlo).',
 '3–6 meses (incluye cicatrización)',
 1200, 2000, 'pieza', false, true, 20,
 '[{"pregunta":"¿Duele la operación?","respuesta":"Se realiza con anestesia local. Durante la intervención no sientes dolor. Los días posteriores puede haber molestias leves, que se controlan perfectamente con analgésicos."},{"pregunta":"¿Cuánto dura un implante?","respuesta":"Con una buena higiene y revisiones periódicas, un implante puede durar décadas o toda la vida."}]'::jsonb),

('implantes-multiples', 'Implantes múltiples', 'implantes',
 'Cuando necesitas reponer varias piezas, los implantes múltiples son la solución más estable y natural.',
 'Si has perdido varios dientes, podemos valorar diferentes soluciones: implantes individuales para cada pieza, o estructuras que se apoyan en menos implantes (puentes sobre implantes). El plan personalizado depende del estado de tu hueso y tus necesidades.',
 'Para quienes han perdido varios dientes y quieren una solución fija y duradera.',
 'Según planificación individual',
 2500, 6000, 'tratamiento', false, true, 21, '[]'::jsonb),

-- ESTÉTICA
('blanqueamiento-dental', 'Blanqueamiento dental profesional', 'estetica',
 'Recupera el blanco natural de tus dientes en una sola sesión o con el cómodo sistema en casa.',
 'El blanqueamiento profesional aclara el tono de tus dientes de forma segura y controlada. En clínica usamos sistemas de luz y gel de alta concentración; la versión domiciliaria combina férulas personalizadas con gel de uso nocturno. Los resultados duran entre 1 y 3 años con buenos hábitos.',
 'Para quien tiene los dientes manchados por café, té, tabaco o simplemente quiere un blanco más brillante.',
 '1 sesión (clínica) o 2–3 semanas (domiciliario)',
 200, 400, 'tratamiento', false, true, 30,
 '[{"pregunta":"¿Daña el esmalte?","respuesta":"El blanqueamiento profesional, bien indicado, no daña el esmalte. Puede haber sensibilidad temporal los primeros días, que desaparece."},{"pregunta":"¿Funciona en dientes con coronas o carillas?","respuesta":"Solo actúa sobre dientes naturales. Las prótesis no cambian de color."}]'::jsonb),

('carillas-porcelana', 'Carillas de porcelana', 'estetica',
 'Transforma tu sonrisa de forma permanente con carillas ultrafinas de porcelana.',
 'Las carillas son láminas muy finas de porcelana que se adhieren a la cara visible del diente. Corrigen el color, la forma, el tamaño y pequeñas posiciones. Son extremadamente naturales y resistentes. Requieren un tallado mínimo del diente.',
 'Para quien quiere un cambio estético significativo y duradero en su sonrisa.',
 '2–3 sesiones',
 600, 1200, 'pieza', false, true, 31, '[]'::jsonb),

('composite-estetico', 'Composite estético (carillas sin tallado)', 'estetica',
 'Mejora tu sonrisa sin tocar el diente: el composite se aplica directamente sobre el esmalte.',
 'El composite es una resina de alta estética que el odontólogo modela directamente sobre el diente, sin necesidad de tallado ni laboratorio. Es una opción más conservadora y económica que las carillas de porcelana, con resultados excelentes para casos leves o moderados.',
 'Ideal para corregir pequeñas fracturas, dientes separados o irregularidades leves.',
 '1 sesión por diente',
 150, 350, 'pieza', false, true, 32, '[]'::jsonb),

-- PERIODONCIA
('limpieza-bucal', 'Limpieza dental profesional', 'general',
 'La limpieza que marca la diferencia. Eliminamos el sarro y dejamos tu boca a punto.',
 'La limpieza profesional (profilaxis) elimina el sarro y la placa que el cepillo no alcanza. También incluye pulido dental y fluorización si se indica. Es la base de una boca sana y se recomienda al menos una vez al año. Es diferente del tratamiento periodontal, que se realiza cuando ya hay enfermedad de encías.',
 'Para todo el mundo como mantenimiento preventivo.',
 '45–60 minutos',
 50, 80, 'sesion', false, true, 60,
 '[{"pregunta":"¿Con qué frecuencia debo hacerme una limpieza?","respuesta":"La recomendación general es una vez al año. Si tienes tendencia a acumular sarro o antecedentes de periodontitis, puede ser cada 6 meses."}]'::jsonb),

('tratamiento-periodontal', 'Tratamiento periodontal', 'periodoncia',
 'Combatimos la periodontitis (enfermedad de las encías) para salvar tus dientes y tu salud general.',
 'La periodontitis es la inflamación profunda de las encías que puede llegar a destruir el hueso que sostiene los dientes. El tratamiento no quirúrgico (raspado y alisado radicular) elimina las bacterias de las bolsas periodontales. En casos avanzados puede requerirse cirugía periodontal. Una vez tratada, el mantenimiento periódico es clave.',
 'Necesario cuando hay sangrado de encías persistente, encías retraídas, movilidad dental o mal aliento crónico.',
 '2–4 sesiones según severidad',
 200, 600, 'tratamiento', false, true, 40, '[]'::jsonb),

-- CIRUGÍA
('extraccion-muela-juicio', 'Extracción de muela del juicio', 'cirugia',
 'Extracción de muelas del juicio incluidas o erupcionadas, con la mayor comodidad posible.',
 'Las muelas del juicio (terceros molares) frecuentemente no tienen espacio para erupcionar correctamente, lo que puede causar dolor, infecciones y daño a los dientes vecinos. La extracción se realiza bajo anestesia local; para casos más complejos (impactaciones profundas) se puede utilizar sedación consciente.',
 'Para quien tiene las muelas del juicio retenidas, semi-incluidas o que causan molestias.',
 '30–60 min por pieza',
 180, 400, 'pieza', false, true, 50, '[]'::jsonb),

('cirugia-osea', 'Cirugía de regeneración ósea', 'cirugia',
 'Recuperamos el hueso perdido para que los implantes tengan la base que necesitan.',
 'Cuando hay pérdida de hueso por extracciones antiguas, periodontitis o traumatismos, puede ser necesario regenerarlo antes de colocar implantes. Se utilizan membranas y materiales de relleno que estimulan la formación de nuevo hueso. Es un procedimiento planificado con precisión y con muy buen pronóstico.',
 'Indicado como paso previo a la implantología en casos con deficiencia ósea.',
 'Según extensión de la zona',
 400, 1200, 'tratamiento', false, true, 51, '[]'::jsonb),

-- GENERAL
('revision-diagnostico', 'Revisión y diagnóstico completo', 'general',
 'Tu punto de partida: exploramos tu boca, identificamos lo que necesitas y te lo explicamos sin tecnicismos.',
 'La primera visita incluye exploración completa, revisión radiológica si se precisa y un diagnóstico detallado en lenguaje claro. Sin sorpresas, sin presión. Si hay que hacer algo, te lo explicamos todo antes de empezar.',
 'Para cualquier persona que quiera saber cómo está su boca. Primera visita gratuita.',
 '30–45 minutos',
 0, 0, 'sesion', false, true, 61,
 '[{"pregunta":"¿La primera visita es gratuita?","respuesta":"Sí, la primera visita de valoración es sin coste y sin compromiso."}]'::jsonb),

('empaste', 'Empaste dental (composite)', 'general',
 'Tratamos la caries y restauramos el diente con composite del color exacto de tus dientes.',
 'Cuando hay caries, extraemos el tejido dañado y rellenamos el espacio con un composite (resina) del color de tus dientes. El resultado es invisible, resistente y se termina en una sola visita. Cuanto antes se trate la caries, más tejido sano conservamos.',
 'Para cualquier persona con caries diagnosticada, de cualquier tamaño.',
 '30–60 minutos',
 50, 120, 'pieza', false, true, 62,
 '[{"pregunta":"¿Se nota el empaste?","respuesta":"Con los composites actuales, el empaste queda del color exacto de tu diente. Es prácticamente imperceptible."}]'::jsonb),

('endodoncia', 'Endodoncia (tratamiento de conductos)', 'general',
 'Salvamos el diente cuando la caries o una infección han llegado hasta el nervio.',
 'La endodoncia (o matar el nervio) consiste en limpiar el interior del diente (los conductos donde está el nervio) y sellarlo para evitar reinfecciones. Permite conservar el diente en la boca en lugar de extraerlo. Con la anestesia actual es un procedimiento cómodo y sin dolor.',
 'Cuando hay infección profunda, dolor espontáneo nocturno o absceso dental.',
 '1–3 sesiones',
 200, 450, 'pieza', false, true, 63, '[]'::jsonb),

('corona-dental', 'Corona dental', 'general',
 'Una funda que reconstruye y protege un diente muy dañado, devolviéndole función y estética.',
 'Una corona es una funda de cerámica (o zirconio) que cubre completamente el diente para protegerlo cuando está muy desgastado, ha sufrido una endodoncia o está muy dañado por caries. Las coronas actuales son indistinguibles de un diente natural.',
 'Para dientes fracturados, muy desgastados o tratados de endodoncia.',
 '2–3 sesiones',
 500, 950, 'pieza', false, true, 64, '[]'::jsonb),

-- ODONTOPEDIATRÍA
('revision-infantil', 'Revisión infantil', 'odontopediatria',
 'La primera visita de los peques: sin miedo, con paciencia y con mucho cariño.',
 'En La Fábrica de Sonrisas somos especialmente cuidadosas con los más pequeños. La primera visita es siempre de conocernos y explorar sin prisa. Explicamos todo a los niños en su lenguaje, usamos técnicas de distracción y hacemos que la clínica sea un sitio al que quieran volver.',
 'Para niños desde la erupción de los primeros dientes de leche. Recomendamos la primera visita alrededor del año de edad.',
 '30 minutos',
 0, 40, 'sesion', false, true, 70,
 '[{"pregunta":"¿A qué edad debo llevar a mi hijo/a al dentista por primera vez?","respuesta":"Recomendamos la primera visita alrededor del año de edad, cuando empiezan a salir los primeros dientes de leche. No hay que esperar a que haya un problema."}]'::jsonb),

('selladores-fisuras', 'Selladores de fisuras', 'odontopediatria',
 'Protección preventiva para los dientes definitivos de los niños: evitamos la caries antes de que llegue.',
 'Los selladores son una resina que se aplica en las fisuras de los molares definitivos recién erupcionados (generalmente entre los 6 y los 12 años). Es un procedimiento rápido, sin anestesia y muy eficaz para prevenir caries en esas zonas de difícil acceso.',
 'Para niños de 6–12 años con molares definitivos recién erupcionados.',
 '15–20 min por cuadrante',
 30, 60, 'pieza', false, true, 71, '[]'::jsonb),

('ortodoncia-infantil', 'Ortodoncia interceptiva infantil', 'odontopediatria',
 'Corregimos a tiempo los problemas que, si se tratan pronto, se resuelven con mucha más facilidad.',
 'La ortodoncia interceptiva actúa sobre la mandíbula y los maxilares en crecimiento para corregir discrepancias antes de que se agraven. Puede reducir o eliminar la necesidad de ortodoncia fija en el futuro. Incluye aparatos removibles, expansores y, en algunos casos, brackets parciales.',
 'Para niños entre 6 y 12 años con problemas de mordida, paladar estrecho o apiñamiento severo.',
 '12–24 meses',
 800, 1800, 'tratamiento', false, true, 72, '[]'::jsonb);

-- =============================================
-- BUDGET WIZARD SEED
-- =============================================

-- Step 1: Main objective
INSERT INTO budget_questions (id, objetivo, pregunta, descripcion, tipo, orden) VALUES
('q-objetivo', 'inicio', '¿Qué te gustaría mejorar?', 'Elige la opción que mejor describe lo que buscas. Puedes cambiarla después.', 'select', 1),
('q-ortodoncia-tipo', 'ortodoncia', '¿Prefieres que se vea o que sea invisible?', 'Hay opciones para todos los gustos y presupuestos.', 'select', 2),
('q-ortodoncia-edad', 'ortodoncia', '¿Para quién es el tratamiento?', null, 'select', 3),
('q-implantes-cantidad', 'implantes', '¿Cuántas piezas necesitas reponer?', 'Una estimación aproximada está bien.', 'select', 4),
('q-estetica-tipo', 'estetica', '¿Qué aspecto quieres mejorar?', null, 'select', 5),
('q-general-tipo', 'general', '¿Qué tipo de problema tienes?', null, 'select', 6);

-- Step 1 options
INSERT INTO budget_options (question_id, label, value, emoji, siguiente_pregunta_id, tratamientos_slugs, orden) VALUES
('q-objetivo', 'Alinear mis dientes', 'ortodoncia', '😁', 'q-ortodoncia-tipo', '{}', 1),
('q-objetivo', 'Reponer piezas perdidas', 'implantes', '🦷', 'q-implantes-cantidad', '{}', 2),
('q-objetivo', 'Blanquear / estética', 'estetica', '✨', 'q-estetica-tipo', '{}', 3),
('q-objetivo', 'Dolor, revisión o caries', 'general', '😬', 'q-general-tipo', '{}', 4),
('q-objetivo', 'Encías o problema periodontal', 'periodoncia', '🌿', null, '{"limpieza-bucal","tratamiento-periodontal"}', 5),
('q-objetivo', 'Es para mi hijo/a', 'ninos', null, null, '{"revision-infantil","selladores-fisuras","ortodoncia-infantil"}', 6);

-- Ortodoncia options
INSERT INTO budget_options (question_id, label, value, emoji, siguiente_pregunta_id, tratamientos_slugs, orden) VALUES
('q-ortodoncia-tipo', 'Invisible (alineadores)', 'invisible', '👻', 'q-ortodoncia-edad', '{"ortodoncia-invisible"}', 1),
('q-ortodoncia-tipo', 'Brackets (más económico)', 'brackets', '🔩', 'q-ortodoncia-edad', '{"brackets-metalicos"}', 2);

INSERT INTO budget_options (question_id, label, value, emoji, siguiente_pregunta_id, tratamientos_slugs, orden) VALUES
('q-ortodoncia-edad', 'Para mí (adulto/a)', 'adulto', '🧑', null, '{}', 1),
('q-ortodoncia-edad', 'Para mi hijo/a (menor)', 'nino', null, null, '{"ortodoncia-infantil"}', 2);

-- Implantes options
INSERT INTO budget_options (question_id, label, value, emoji, siguiente_pregunta_id, tratamientos_slugs, orden) VALUES
('q-implantes-cantidad', 'Una pieza', '1', '1️⃣', null, '{"implante-unitario"}', 1),
('q-implantes-cantidad', '2–3 piezas', '2-3', '2️⃣', null, '{"implantes-multiples"}', 2),
('q-implantes-cantidad', 'Más de 3 piezas', '4+', '🦷', null, '{"implantes-multiples"}', 3);

-- Estética options
INSERT INTO budget_options (question_id, label, value, emoji, siguiente_pregunta_id, tratamientos_slugs, orden) VALUES
('q-estetica-tipo', 'Color / blanqueamiento', 'blanqueo', '🤍', null, '{"blanqueamiento-dental"}', 1),
('q-estetica-tipo', 'Forma y color (carillas)', 'carillas', '💎', null, '{"carillas-porcelana","composite-estetico"}', 2),
('q-estetica-tipo', 'Todo lo anterior', 'integral', '✨', null, '{"blanqueamiento-dental","carillas-porcelana"}', 3);

-- General options
INSERT INTO budget_options (question_id, label, value, emoji, siguiente_pregunta_id, tratamientos_slugs, orden) VALUES
('q-general-tipo', 'Revisión general', 'revision', '🔍', null, '{"revision-diagnostico","limpieza-bucal"}', 1),
('q-general-tipo', 'Caries / dolor de muela', 'caries', '😣', null, '{"empaste","endodoncia"}', 2),
('q-general-tipo', 'Diente roto o muy dañado', 'roto', '💥', null, '{"corona-dental","implante-unitario"}', 3),
('q-general-tipo', 'Muela del juicio', 'muela-juicio', '😰', null, '{"extraccion-muela-juicio"}', 4);

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_options ENABLE ROW LEVEL SECURITY;

-- Public read for treatments and budget wizard
CREATE POLICY "treatments_public_read" ON treatments FOR SELECT USING (visible = true);
CREATE POLICY "budget_questions_public_read" ON budget_questions FOR SELECT USING (true);
CREATE POLICY "budget_options_public_read" ON budget_options FOR SELECT USING (true);

-- Leads: insert only (no public read)
CREATE POLICY "leads_insert" ON leads FOR INSERT WITH CHECK (true);

-- Admin full access (service role bypasses RLS anyway)
CREATE POLICY "treatments_admin" ON treatments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "leads_admin" ON leads FOR SELECT USING (auth.role() = 'authenticated');
