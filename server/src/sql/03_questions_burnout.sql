-- Data from burnout.json

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 1, 'Я чувствую эмоциональное истощение на работе', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 2, 'После работы у меня нет сил на личные дела', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 3, 'Я стал(а) более цинично относиться к своей работе', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 4, 'Мне кажется, что моя работа не имеет смысла', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 5, 'Я чувствую разочарование в своей профессии', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 6, 'Мне трудно сосредоточиться на рабочих задачах', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 7, 'Я чувствую себя менее продуктивным, чем раньше', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 8, 'Я стал(а) более раздражительным с коллегами', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 9, 'Мысли о работе мешают мне расслабиться в выходные', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 10, 'Я чувствую безразличие к результатам своей работы', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 11, 'У меня нарушился сон из-за рабочих мыслей', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 12, 'Я чувствую, что мои усилия не ценятся', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 13, 'Мне трудно вставать по утрам на работу', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 14, 'Я часто болею (простуды, головные боли)', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 15, 'Я откладываю рабочие задачи на потом', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 16, 'Я чувствую себя эмоционально опустошенным к концу дня', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 17, 'Мне кажется, что я не достигаю своих целей в работе', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 18, 'Я избегаю общения с коллегами', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 19, 'Я чувствую снижение мотивации к работе', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 20, 'У меня появились проблемы с памятью и концентрацией', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 21, 'Я чувствую себя застрявшим в карьере', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('burnout', 22, 'Я думаю о смене работы или профессии', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

