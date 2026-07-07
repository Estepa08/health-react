-- Data from depression.json

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 1, 'Вам грустно или вы в плохом настроении', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 2, 'Чувствуете грусть, удручены', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 3, 'Чувствуете желание расплакаться, слезливость', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 4, 'Чувствуете уныние', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 5, 'Испытываете чувство безнадежности', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 6, 'Имеете низкую самооценку', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 7, 'Испытываете чувство собственной ничтожности и непригодности', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 8, 'Испытываете чувство вины или стыда', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 9, 'Критикуете или обвиняете самого себя', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 10, 'Испытываете трудности с принятием решений', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 11, 'Чувствуете потерю интереса к членам семьи, друзьям, коллегам', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 12, 'Испытываете одиночество', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 13, 'Проводите меньше времени с семьей или с друзьями', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 14, 'Чувствуете потерю мотивации', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 15, 'Чувствуете потерю интереса к работе или другим занятиям', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 16, 'Избегаете работы и другой деятельности', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 17, 'Ощущаете потерю удовольствия и нехватку удовлетворения от жизни', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 18, 'Чувствуете усталость', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 19, 'Испытываете затруднения со сном или, наоборот, слишком много спите', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 20, 'Имеете сниженный или, наоборот, повышенный аппетит', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 21, 'Замечаете потерю интереса к сексу', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 22, 'Беспокоитесь по поводу своего здоровья', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 23, 'Имеются ли у вас суицидальные мысли?', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 24, 'Хотели бы вы окончить свою жизнь?', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('depression', 25, 'Планируете ли вы навредить себе?', '["Ни разу","Иногда","Умеренно","Часто","Крайне часто"]'::jsonb, NULL)
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

