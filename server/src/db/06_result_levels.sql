-- Data from results-config.json

TRUNCATE TABLE result_levels RESTART IDENTITY;

INSERT INTO result_levels (min_score, max_score, title, emoji, description) VALUES (0, 20, 'Низкий уровень', '✅', 'Ваши показатели в норме');
INSERT INTO result_levels (min_score, max_score, title, emoji, description) VALUES (21, 40, 'Умеренный уровень', '⚠️', 'Рекомендуется обратить внимание');
INSERT INTO result_levels (min_score, max_score, title, emoji, description) VALUES (41, 60, 'Высокий уровень', '🚨', 'Рекомендуется обратиться к специалисту');
