-- Data from cognitive.json

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 1, 'Когда я делаю ошибку, я чувствую себя полным неудачником', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'dichotomous_thinking')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 2, 'Если что-то идет не по плану, я ожидаю худшего развития событий', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'catastrophizing')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 3, 'Одна неудача заставляет меня думать, что у меня ничего не получится в будущем', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'overgeneralization')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 4, 'В хорошем дне одна проблема может испортить всё остальное', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'mental_filter')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 5, 'Когда меня хвалят, я думаю, что люди просто пытаются быть вежливыми', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'disqualifying_positive')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 6, 'Я часто уверен, что знаю, что другие люди думают обо мне', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'mind_reading')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 7, 'Я заранее уверен, что новые дела у меня не получатся', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'fortune_telling')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 8, 'Я часто думаю словами ''должен'', ''обязан'', ''надо''', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'should_statements')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 9, 'Я склонен навешивать ярлыки на себя и других (''я неудачник'', ''он эгоист'')', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'labeling')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 10, 'Если кто-то выглядит расстроенным, я думаю, что это из-за меня', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'personalization')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 11, 'Для меня вещи либо идеальны, либо ужасны - среднего не бывает', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'dichotomous_thinking')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 12, 'Небольшие проблемы кажутся мне концом света', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'catastrophizing')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 13, 'Если один человек меня критикует, я думаю, что все так считают', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'overgeneralization')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 14, 'В успешном проекте я замечаю только недочеты', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'mental_filter')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 15, 'Свои успехи я считаю ''простой удачей'', а не результатом усилий', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'disqualifying_positive')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 16, 'Я часто предполагаю, что люди относятся ко мне негативно, без явных доказательств', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'mind_reading')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 17, 'Перед важными событиями я уверен, что они пройдут плохо', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'fortune_telling')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 18, 'Я строго требую от себя совершенства во всем', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'should_statements')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 19, 'В спорах я склонен характеризовать людей по одному поступку', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'labeling')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 20, 'Проблемы в семье или на работе я часто принимаю на свой счет', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'personalization')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 21, 'Если я не лучший в чем-то, значит я плохой', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'dichotomous_thinking')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 22, 'Незначительное недомогание заставляет меня думать о серьезной болезни', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'catastrophizing')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 23, 'Один негативный опыт определяет мое отношение к похожим ситуациям', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'overgeneralization')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 24, 'В приятных событиях я фокусируюсь на том, что пошло не так', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'mental_filter')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

INSERT INTO questions (theme_id, question_number, question, options, category) VALUES ('cognitive', 25, 'Комплименты в мой адрес кажутся мне незаслуженными', '["Никогда","Редко","Иногда","Часто","Постоянно"]'::jsonb, 'disqualifying_positive')
ON CONFLICT (theme_id, question_number) DO UPDATE SET question = EXCLUDED.question, options = EXCLUDED.options, category = EXCLUDED.category;

