-- Data from anxiety.json

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 1, 'Я чувствую беспокойство без видимой причины', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 2, 'Мне трудно расслабиться', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 3, 'Я чувствую напряжение в мышцах', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 4, 'Меня легко напугать', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 5, 'У меня возникают приступы паники', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 6, 'Я беспокоюсь о будущем', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 7, 'Мне трудно заснуть из-за беспокойных мыслей', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 8, 'Я ощущаю дрожь в руках или ногах', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 9, 'Мне трудно сосредоточиться из-за тревоги', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 10, 'Я избегаю ситуаций, которые вызывают у меня тревогу', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 11, 'У меня учащается сердцебиение без физической нагрузки', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 12, 'Я чувствую головокружение или дурноту', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 13, 'Мне трудно дышать (ощущение нехватки воздуха)', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 14, 'Я чрезмерно беспокоюсь о здоровье', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 15, 'Я чувствую, что вот-вот случится что-то плохое', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 16, 'Меня беспокоит, что я могу потерять контроль', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 17, 'Я чувствую раздражительность и нетерпеливость', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 18, 'Меня беспокоит мнение других людей обо мне', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 19, 'Я испытываю тошноту или дискомфорт в животе', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('anxiety', 20, 'Мне трудно сидеть на месте из-за беспокойства', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

