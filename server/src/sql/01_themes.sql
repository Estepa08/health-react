-- Data from themes.json

INSERT INTO themes (id, title, description, icon, questions_file, length, category) VALUES ('depression', 'Тест на депрессию', 'Оценка эмоционального состояния', '😔', 'depression.json', 25, 'mental_health')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, icon = EXCLUDED.icon, questions_file = EXCLUDED.questions_file, length = EXCLUDED.length, category = EXCLUDED.category;

INSERT INTO themes (id, title, description, icon, questions_file, length, category) VALUES ('cognitive', 'Когнитивные искажения', 'Анализ паттернов мышления', '🧠', 'cognitive.json', 25, 'thinking')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, icon = EXCLUDED.icon, questions_file = EXCLUDED.questions_file, length = EXCLUDED.length, category = EXCLUDED.category;

INSERT INTO themes (id, title, description, icon, questions_file, length, category) VALUES ('anxiety', 'Уровень тревожности', 'Оценка тревожных состояний', '😰', 'anxiety.json', 20, 'mental_health')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, icon = EXCLUDED.icon, questions_file = EXCLUDED.questions_file, length = EXCLUDED.length, category = EXCLUDED.category;

INSERT INTO themes (id, title, description, icon, questions_file, length, category) VALUES ('burnout', 'Профессиональное выгорание', 'Тест на уровень выгорания', '🔥', 'burnout.json', 22, 'work_health')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, icon = EXCLUDED.icon, questions_file = EXCLUDED.questions_file, length = EXCLUDED.length, category = EXCLUDED.category;

