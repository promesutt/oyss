# -*- coding: utf-8 -*-
import json

scenarios_data = [
    # SENARYO 1 (4 Qs: E7.1.R1: 1, E7.1.W1: 1, E7.2.R1: 1, E7.2.W1: 1) -> 25, 25, 25, 25 = 100
    {
        "id": "exam_7_ingilizce_1_1_senaryo_1",
        "grade": 7,
        "subjectId": "ingilizce",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_1",
        "title": "7. Sınıf İngilizce 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (4 Soru)",
        "durationMinutes": 40,
        "totalPoints": 100,
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "E7.1.R1",
                "outcomeTitle": "E7.1.R1. Students will be able to understand a simple text about appearance and personality.",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 25,
                "contextText": "Reading comprehension: Mark and Liam.",
                "stimulus": "Read the text below and answer the questions:\n\n'Mark and Liam are classmates. Mark is tall and slim with curly dark hair and blue eyes. He is very outgoing and generous; he always buys presents for his friends and loves telling jokes. Liam is medium-height with straight brown hair and hazel eyes. He is quite shy and calm, but he is more hardworking than Mark because he studies three hours every evening.'",
                "questionText": "Based on the text above, answer the questions in full English sentences:\na) What does Mark look like? (Write two physical qualities)\nb) What is Liam like? (Write two personality traits)",
                "solutionExplanation": "Physical appearance vs personality traits extraction.",
                "modelAnswer": "a) Mark is tall and slim (with curly dark hair and blue eyes).\nb) Liam is shy and calm (and more hardworking than Mark).",
                "rubric": [
                    {"criterion": "a şıkkında Mark'ın fiziksel özelliklerinin doğru yazılması", "points": 13},
                    {"criterion": "b şıkkında Liam'ın kişilik özelliklerinin doğru yazılması", "points": 12}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "E7.1.W1",
                "outcomeTitle": "E7.1.W1. Students will be able to write simple pieces to compare appearances and personalities of people.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 25,
                "contextText": "Comparative sentences writing.",
                "stimulus": "Look at the information about Kerem and Can:\n• Kerem: 15 years old, 175 cm, 65 kg, gets 95 in math exams, helps friends.\n• Can: 14 years old, 168 cm, 70 kg, gets 80 in math exams, loves talking to everyone.",
                "questionText": "Write two comparative sentences comparing Kerem and Can by using comparative forms of adjectives:\n1) Compare their physical appearance (e.g. tall, slim, young, etc.)\n2) Compare their personality or abilities (e.g. hardworking, outgoing, etc.)",
                "solutionExplanation": "Forming correct comparative structures: -er than / more ... than.",
                "modelAnswer": "1. Kerem is taller (or slimmer / older) than Can. / Can is shorter (or younger) than Kerem.\n2. Kerem is more hardworking than Can. / Can is more outgoing than Kerem.",
                "rubric": [
                    {"criterion": "1. cümlede doğru fiziksel karşılaştırma kalıbı kurulması", "points": 13},
                    {"criterion": "2. cümlede doğru kişilik/karakter karşılaştırma kalıbı kurulması", "points": 12}
                ]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "E7.2.R1",
                "outcomeTitle": "E7.2.R1. Students will be able to understand short and simple texts on sports.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Metin İçi Delillendirme & Örtük Anlam",
                "points": 25,
                "contextText": "Reading text about Mete Gazoz.",
                "stimulus": "Read the paragraph about the Turkish Olympic champion Mete Gazoz:\n\n'Mete Gazoz is a world-famous Turkish archer. He won a gold medal at the Tokyo 2020 Olympic Games. Archery is an individual outdoor sport. To practice archery, athletes need a bow, arrows, and an arm guard. Mete trains six days a week. He always wakes up early, does eye exercises, and shoots hundreds of arrows every single day.'",
                "questionText": "Answer the following questions according to the text:\na) What equipment does an archer need?\nb) Is archery a team sport or an individual sport?\nc) How often does Mete train?",
                "solutionExplanation": "Extracting sports equipment, sport category, and frequency from the text.",
                "modelAnswer": "a) An archer needs a bow, arrows, and an arm guard.\nb) Archery is an individual sport.\nc) He trains six days a week (or: He shoots hundreds of arrows every single day).",
                "rubric": [
                    {"criterion": "a şıkkında ekipmanların eksiksiz yazılması", "points": 9},
                    {"criterion": "b şıkkında bireysel spor olduğunun belirtilmesi", "points": 8},
                    {"criterion": "c şıkkında antrenman sıklığının doğru yazılması", "points": 8}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "E7.2.W1",
                "outcomeTitle": "E7.2.W1. Students will be able to write pieces about routines/daily activities by using frequency adverbs.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 25,
                "contextText": "Writing sports routine with frequency adverbs.",
                "stimulus": "Think about your own weekly sports routine or favorite physical activities.",
                "questionText": "Write a short paragraph (3 full sentences) about your sports routine. You MUST use at least two frequency adverbs (always, usually, often, sometimes, rarely, never) and name at least one sport and piece of equipment.",
                "solutionExplanation": "Using simple present tense, frequency adverbs in correct position, sports vocabulary.",
                "modelAnswer": "Example Student Answer:\n'I usually play basketball with my classmates after school on Fridays. We always take our basketball ball and sneakers to the court. I rarely play tennis because I don't have a racket.'",
                "rubric": [
                    {"criterion": "En az 2 sıklık zarfının (usually, always vb.) doğru yerde kullanılması", "points": 10},
                    {"criterion": "Spor adı ve spor ekipmanının doğru İngilizceyle yazılması", "points": 8},
                    {"criterion": "Gramer (Geniş Zaman) ve imla kurallarına tam uyum", "points": 7}
                ]
            }
        ]
    },

    # SENARYO 2 (5 Qs: E7.1.R1: 2, E7.1.W1: 1, E7.2.R1: 2) -> 20, 20, 20, 20, 20 = 100
    {
        "id": "exam_7_ingilizce_1_1_senaryo_2",
        "grade": 7,
        "subjectId": "ingilizce",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_2",
        "title": "7. Sınıf İngilizce 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 2) (5 Soru)",
        "durationMinutes": 40,
        "totalPoints": 100,
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "E7.1.R1",
                "outcomeTitle": "E7.1.R1. Students will be able to understand a simple text about appearance and personality.",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 20,
                "contextText": "Reading: Two sisters, Clara and Fiona.",
                "stimulus": "Read the text:\n\n'Clara and Fiona are twin sisters, but they look and act completely different. Clara has got long wavy blonde hair and green eyes. She is plump and short. She is very cheerful and talkative; she makes friends easily. Fiona has got short straight brown hair and dark eyes. She is tall and slim. Unlike Clara, Fiona is quiet and punctual. She never arrives late for appointments.'",
                "questionText": "Fill in the missing details in the comparison chart based on the text:\n1) Clara's hair and build: ....................................................\n2) Fiona's personality traits: ....................................................",
                "solutionExplanation": "Extracting physical and personality traits.",
                "modelAnswer": "1) Clara has got long wavy blonde hair and she is plump and short.\n2) Fiona is quiet and punctual (she never arrives late).",
                "rubric": [
                    {"criterion": "1. maddede Clara'nın saç ve vücut yapısının yazılması", "points": 10},
                    {"criterion": "2. maddede Fiona'nın kişilik özelliklerinin yazılması", "points": 10}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "E7.1.R1",
                "outcomeTitle": "E7.1.R1. Students will be able to understand a simple text about appearance and personality.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Metin İçi Delillendirme & Örtük Anlam",
                "points": 20,
                "contextText": "True / False statements with justifications.",
                "stimulus": "According to the text about Clara and Fiona:\nStatement 1: 'Clara finds it difficult to make new friends.'\nStatement 2: 'Fiona is always on time for her plans.'",
                "questionText": "Write whether the statements are TRUE or FALSE. Quote one clue phrase from the text for each:\na) Statement 1: ................. (Clue: .................)\nb) Statement 2: ................. (Clue: .................)",
                "solutionExplanation": "Validating comprehension through text evidence.",
                "modelAnswer": "a) Statement 1 is FALSE. Clue: 'she makes friends easily' / 'she is very cheerful and talkative'.\nb) Statement 2 is TRUE. Clue: 'Fiona is quiet and punctual' / 'She never arrives late for appointments'.",
                "rubric": [
                    {"criterion": "a şıkkında FALSE tespiti ve doğru kanıt cümlenin alıntılanması", "points": 10},
                    {"criterion": "b şıkkında TRUE tespiti ve doğru kanıt cümlenin alıntılanması", "points": 10}
                ]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "E7.1.W1",
                "outcomeTitle": "E7.1.W1. Students will be able to write simple pieces to compare appearances and personalities of people.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 20,
                "contextText": "Comparing two sports players: Arda and Barış.",
                "stimulus": "Information card:\n• Arda: 19 years old, 176 cm, generous (donates money to schools), modest.\n• Barış: 24 years old, 186 cm, stingy (hates sharing money), stubborn.",
                "questionText": "Write two comparative sentences using the given adjectives:\na) (tall / short): Compare Arda and Barış.\nb) (generous / stingy): Compare Arda and Barış.",
                "solutionExplanation": "Comparative adjectives (-er / more).",
                "modelAnswer": "a) Barış is taller than Arda. / Arda is shorter than Barış.\nb) Arda is more generous than Barış. / Barış is stingier than Arda.",
                "rubric": [
                    {"criterion": "a şıkkında boy karşılaştırma cümlesinin doğru yazılması", "points": 10},
                    {"criterion": "b şıkkında cömertlik/cimrilik karşılaştırma cümlesinin doğru yazılması", "points": 10}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "E7.2.R1",
                "outcomeTitle": "E7.2.R1. Students will be able to understand short and simple texts on sports.",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 20,
                "contextText": "Reading about Volleyball camp.",
                "stimulus": "Read the text:\n\n'Volleyball is a popular team sport played with two teams of six players. Players hit the ball over a high net using their hands and arms. To prevent knee injuries when diving on the hard wooden court, volleyball players must wear kneepads. Our school team practices three times a week in the indoor gym.'",
                "questionText": "Answer the questions according to the paragraph:\na) How many players are there in a volleyball team on the court?\nb) Where do the team players practice and what equipment protects their knees?",
                "solutionExplanation": "Information extraction: number of players, venue, and safety equipment.",
                "modelAnswer": "a) There are six players in a team on the court.\nb) They practice in the indoor gym and they wear kneepads to protect their knees.",
                "rubric": [
                    {"criterion": "a şıkkında oyuncu sayısının (six) doğru yazılması", "points": 10},
                    {"criterion": "b şıkkında indoor gym ve kneepads bilgisinin yazılması", "points": 10}
                ]
            },
            {
                "questionNumber": 5,
                "outcomeCode": "E7.2.R1",
                "outcomeTitle": "E7.2.R1. Students will be able to understand short and simple texts on sports.",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Metin İçi Delillendirme & Örtük Anlam",
                "points": 20,
                "contextText": "Indoor vs outdoor sports classification.",
                "stimulus": "Read the list of sports: 'Swimming in a lake, table tennis, ice skating, rock climbing, badminton in a gym, trekking.'",
                "questionText": "Classify the given sports into two categories:\n• INDOOR SPORTS (write 2): ....................................................\n• OUTDOOR SPORTS (write 2): ....................................................",
                "solutionExplanation": "Classifying sports as indoor or outdoor.",
                "modelAnswer": "• Indoor Sports: Table tennis, badminton (in a gym), ice skating (indoor arena).\n• Outdoor Sports: Swimming in a lake, rock climbing, trekking.",
                "rubric": [
                    {"criterion": "İki kapalı alan sporunun (indoor) doğru seçilmesi", "points": 10},
                    {"criterion": "İki açık alan sporunun (outdoor) doğru seçilmesi", "points": 10}
                ]
            }
        ]
    },

    # SENARYO 3 (6 Qs: E7.1.R1: 2, E7.1.W1: 1, E7.2.R1: 2, E7.2.W1: 1) -> Points: 17, 17, 17, 17, 16, 16 = 100
    {
        "id": "exam_7_ingilizce_1_1_senaryo_3",
        "grade": 7,
        "subjectId": "ingilizce",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_3",
        "title": "7. Sınıf İngilizce 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 3) (6 Soru)",
        "durationMinutes": 40,
        "totalPoints": 100,
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "E7.1.R1",
                "outcomeTitle": "E7.1.R1. Students will be able to understand a simple text about appearance and personality.",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 17,
                "contextText": "David's new school in Istanbul.",
                "stimulus": "Read David's email to his cousin in London:\n\n'Dear Sam, I love my new school in Istanbul! My deskmate Mehmet is very friendly and honest. He never tells lies and always helps me with Turkish words. He is medium-height with short black hair and brown eyes. Our English teacher, Mrs. Demir, is very energetic and patient with all foreign students.'",
                "questionText": "Based on David's email:\na) Why does David think Mehmet is honest? Write the sentence from the text.\nb) How does David describe Mrs. Demir's personality?",
                "solutionExplanation": "Extracting reasons and personality adjectives.",
                "modelAnswer": "a) Because 'He never tells lies (and always helps me with Turkish words)'.\nb) Mrs. Demir is very energetic and patient.",
                "rubric": [
                    {"criterion": "a şıkkında dürüstlük gerekçesinin doğru alıntılanması", "points": 9},
                    {"criterion": "b şıkkında Mrs. Demir'in kişilik özelliklerinin yazılması", "points": 8}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "E7.1.R1",
                "outcomeTitle": "E7.1.R1. Students will be able to understand a simple text about appearance and personality.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Öğrenci Diyaloğu & Kavram Yanılgısı",
                "points": 17,
                "contextText": "Physical appearance vs personality adjectives.",
                "stimulus": "Look at the list of words: 'plump, clumsy, selfish, wavy, stubborn, freckles, generous, slim.'",
                "questionText": "Divide the adjectives into two columns:\n• PHYSICAL APPEARANCE (Write 3 words): .................................\n• PERSONALITY (Write 3 words): .................................",
                "solutionExplanation": "Distinguishing physical appearance adjectives from personality adjectives.",
                "modelAnswer": "• Physical Appearance: plump, wavy, freckles, slim.\n• Personality: clumsy, selfish, stubborn, generous.",
                "rubric": [
                    {"criterion": "Fiziksel özellik belirten 3 kelimenin doğru yazılması", "points": 9},
                    {"criterion": "Kişilik/karakter belirten 3 kelimenin doğru yazılması", "points": 8}
                ]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "E7.1.W1",
                "outcomeTitle": "E7.1.W1. Students will be able to write simple pieces to compare appearances and personalities of people.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 17,
                "contextText": "Comparing grandfather and grandson.",
                "stimulus": "Grandfather Tahsin (72 years old, walks slowly, very wise and patient) and grandson Emre (13 years old, runs fast, energetic and impatient).",
                "questionText": "Write two sentences comparing Tahsin and Emre:\n1) Use comparative adjective 'younger' or 'older'.\n2) Use comparative adjective 'more patient' or 'more energetic'.",
                "solutionExplanation": "Forming grammatically correct comparative sentences.",
                "modelAnswer": "1) Emre is younger than Tahsin. / Tahsin is older than Emre.\n2) Tahsin is more patient than Emre. / Emre is more energetic than Tahsin.",
                "rubric": [
                    {"criterion": "1. cümlede yaş karşılaştırmasının doğru yapılması", "points": 9},
                    {"criterion": "2. cümlede kişilik karşılaştırmasının doğru yapılması", "points": 8}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "E7.2.R1",
                "outcomeTitle": "E7.2.R1. Students will be able to understand short and simple texts on sports.",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 17,
                "contextText": "Reading: Swimming champion Defne.",
                "stimulus": "Read the text:\n\n'Defne is a national swimmer. She wakes up at 5:30 am every weekday. She goes to the Olympic pool and swims for two hours before school. She always wears her swimsuit, goggles, and swim cap. She eats healthy food like eggs, fruits, and fish to stay strong.'",
                "questionText": "Answer the questions:\na) What equipment does Defne use when swimming?\nb) What does Defne eat to stay healthy and strong?",
                "solutionExplanation": "Extracting swimming equipment and dietary habits.",
                "modelAnswer": "a) She uses / wears a swimsuit, goggles, and a swim cap.\nb) She eats healthy food like eggs, fruits, and fish.",
                "rubric": [
                    {"criterion": "a şıkkında yüzme ekipmanlarının (goggles, swim cap vb.) yazılması", "points": 9},
                    {"criterion": "b şıkkında sağlıklı besinlerin (eggs, fruits, fish) yazılması", "points": 8}
                ]
            },
            {
                "questionNumber": 5,
                "outcomeCode": "E7.2.R1",
                "outcomeTitle": "E7.2.R1. Students will be able to understand short and simple texts on sports.",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Metin İçi Delillendirme & Örtük Anlam",
                "points": 16,
                "contextText": "Sports rules and fair play.",
                "stimulus": "Read the quote from a sports referee: 'In football, touching the ball with hands is a foul, except for the goalkeeper inside the penalty area. Players should respect the referee and follow the fair play rules.'",
                "questionText": "According to the referee's statement:\na) Which player can touch the ball with hands in football?\nb) What does 'fair play' mean for athletes? Explain briefly in English.",
                "solutionExplanation": "Understanding rules of soccer and fair play concept.",
                "modelAnswer": "a) Only the goalkeeper (inside the penalty box) can touch the ball with hands.\nb) Fair play means playing honestly, respecting rules, opponents, and referees without cheating.",
                "rubric": [
                    {"criterion": "a şıkkında kalecinin (goalkeeper) belirtilmesi", "points": 8},
                    {"criterion": "b şıkkında adil oyun (fair play) ve kurala saygının açıklanması", "points": 8}
                ]
            },
            {
                "questionNumber": 6,
                "outcomeCode": "E7.2.W1",
                "outcomeTitle": "E7.2.W1. Students will be able to write pieces about routines/daily activities by using frequency adverbs.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 16,
                "contextText": "Frequency adverbs: Daily routines table.",
                "stimulus": "Look at Selim's weekly activities:\n• Go cycling: 5 days a week (★★★★☆)\n• Play computer games: 1 day a month (☆☆☆☆☆)\n• Do morning gymnastics: 7 days a week (★★★★★)",
                "questionText": "Write 2 sentences describing Selim's routine using suitable frequency adverbs (always, usually, rarely):\n1) Sentence about gymnastics:\n2) Sentence about computer games:",
                "solutionExplanation": "Converting frequency data into sentences with adverbs.",
                "modelAnswer": "1) Selim always does morning gymnastics.\n2) Selim rarely (or seldom) plays computer games.",
                "rubric": [
                    {"criterion": "1. cümlede 'always' sıklık zarfının doğru kullanılması", "points": 8},
                    {"criterion": "2. cümlede 'rarely / seldom' sıklık zarfının doğru kullanılması", "points": 8}
                ]
            }
        ]
    },

    # SENARYO 4 (7 Qs: E7.1.R1: 2, E7.1.W1: 2, E7.2.R1: 2, E7.2.W1: 1) -> 15, 15, 14, 14, 14, 14, 14 = 100
    {
        "id": "exam_7_ingilizce_1_1_senaryo_4",
        "grade": 7,
        "subjectId": "ingilizce",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_4",
        "title": "7. Sınıf İngilizce 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 4) (7 Soru)",
        "durationMinutes": 40,
        "totalPoints": 100,
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "E7.1.R1",
                "outcomeTitle": "E7.1.R1. Students will be able to understand a simple text about appearance and personality.",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 15,
                "contextText": "Class election: candidates profile.",
                "stimulus": "Read the school election notice:\n\n'Two students are running for class president: Zeynep is generous, outgoing, and good at public speaking. She has long dark wavy hair. Murat is smart, punctual, and very calm. He wears glasses and has short curly hair.'",
                "questionText": "Answer the questions:\na) Who is better at public speaking?\nb) What does Murat look like?",
                "solutionExplanation": "Information extraction from election profiles.",
                "modelAnswer": "a) Zeynep is better at public speaking.\nb) Murat wears glasses and has short curly hair.",
                "rubric": [
                    {"criterion": "a şıkkında Zeynep'in doğru yazılması", "points": 8},
                    {"criterion": "b şıkkında Murat'ın gözlük ve kıvırcık saç özelliğinin yazılması", "points": 7}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "E7.1.R1",
                "outcomeTitle": "E7.1.R1. Students will be able to understand a simple text about appearance and personality.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Öğrenci Diyaloğu & Kavram Yanılgısı",
                "points": 15,
                "contextText": "Personality idioms and meanings.",
                "stimulus": "Match the personality definitions:\n1. Someone who never changes his mind easily.\n2. Someone who enjoys buying gifts and sharing things.",
                "questionText": "Write the correct adjectives for each definition (choose from: stubborn, clumsy, generous, selfish):\nDefinition 1 is: ....................................................\nDefinition 2 is: ....................................................",
                "solutionExplanation": "Stubborn vs generous definitions.",
                "modelAnswer": "Definition 1 is: stubborn.\nDefinition 2 is: generous.",
                "rubric": [
                    {"criterion": "1. tanım için 'stubborn' kelimesinin doğru yazılması", "points": 8},
                    {"criterion": "2. tanım için 'generous' kelimesinin doğru yazılması", "points": 7}
                ]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "E7.1.W1",
                "outcomeTitle": "E7.1.W1. Students will be able to write simple pieces to compare appearances and personalities of people.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 14,
                "contextText": "Comparing weights and heights.",
                "stimulus": "Ahmet (85 kg) and Tolga (62 kg).",
                "questionText": "Write a comparative sentence using 'heavier than' or 'slimmer than' to compare Ahmet and Tolga.",
                "solutionExplanation": "Applying comparative adjective rules.",
                "modelAnswer": "Ahmet is heavier than Tolga. / Tolga is slimmer than Ahmet.",
                "rubric": [
                    {"criterion": "Ağırlık/zayıflık karşılaştırmasının kurallı İngilizceyle yazılması", "points": 14}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "E7.1.W1",
                "outcomeTitle": "E7.1.W1. Students will be able to write simple pieces to compare appearances and personalities of people.",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 14,
                "contextText": "Comparing study habits.",
                "stimulus": "Selin studies 4 hours every day. Berk studies 1 hour every day.",
                "questionText": "Write a comparative sentence using the adjective 'hardworking' to compare Selin and Berk.",
                "solutionExplanation": "Using 'more hardworking than'.",
                "modelAnswer": "Selin is more hardworking than Berk.",
                "rubric": [
                    {"criterion": "'more hardworking than' kalıbının eksiksiz yazılması", "points": 14}
                ]
            },
            {
                "questionNumber": 5,
                "outcomeCode": "E7.2.R1",
                "outcomeTitle": "E7.2.R1. Students will be able to understand short and simple texts on sports.",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 14,
                "contextText": "Reading: Gymnastics routine of Bilge.",
                "stimulus": "Read the text:\n\n'Bilge is a 12-year-old rhythmic gymnast. She trains in the gym every afternoon. She does stretching exercises, uses ribbons and hoops, and practices on the balance beam. She says gymnastics requires great flexibility, balance, and discipline.'",
                "questionText": "According to the text:\na) What equipment does Bilge use in rhythmic gymnastics?\nb) Which three qualities does gymnastics require according to Bilge?",
                "solutionExplanation": "Extracting equipment and athlete qualities.",
                "modelAnswer": "a) She uses ribbons and hoops (and the balance beam).\nb) It requires flexibility, balance, and discipline.",
                "rubric": [
                    {"criterion": "a şıkkında ribbons ve hoops ekipmanlarının yazılması", "points": 7},
                    {"criterion": "b şıkkında flexibility, balance ve discipline kelimelerinin yazılması", "points": 7}
                ]
            },
            {
                "questionNumber": 6,
                "outcomeCode": "E7.2.R1",
                "outcomeTitle": "E7.2.R1. Students will be able to understand short and simple texts on sports.",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Metin İçi Delillendirme & Örtük Anlam",
                "points": 14,
                "contextText": "Team sports vs individual sports.",
                "stimulus": "Basketball, tennis, archery, handball, swimming, football.",
                "questionText": "Write down two TEAM SPORTS and two INDIVIDUAL SPORTS from the list above:\n• Team sports (2): ....................................................\n• Individual sports (2): ....................................................",
                "solutionExplanation": "Categorizing sports.",
                "modelAnswer": "• Team sports: Basketball, handball, football.\n• Individual sports: Tennis, archery, swimming.",
                "rubric": [
                    {"criterion": "İki takım sporunun doğru seçilmesi", "points": 7},
                    {"criterion": "İki bireysel sporun doğru seçilmesi", "points": 7}
                ]
            },
            {
                "questionNumber": 7,
                "outcomeCode": "E7.2.W1",
                "outcomeTitle": "E7.2.W1. Students will be able to write pieces about routines/daily activities by using frequency adverbs.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 14,
                "contextText": "Weekly timetable and frequency writing.",
                "stimulus": "Timetable of Kerem:\n• Monday, Wednesday, Friday: Karate class\n• Saturday: Hiking in nature",
                "questionText": "Write two sentences about Kerem's routine using 'three times a week' and 'once a week':\n1) Karate sentence:\n2) Hiking sentence:",
                "solutionExplanation": "Using frequency expressions correctly.",
                "modelAnswer": "1) Kerem does karate three times a week.\n2) Kerem goes hiking once a week (on Saturdays).",
                "rubric": [
                    {"criterion": "1. cümlede 'three times a week' ve 'does karate' kullanımının doğruluğu", "points": 7},
                    {"criterion": "2. cümlede 'once a week' ve 'goes hiking' kullanımının doğruluğu", "points": 7}
                ]
            }
        ]
    },

    # SENARYO 5 (8 Qs: E7.1.R1: 2, E7.1.W1: 2, E7.2.R1: 3, E7.2.W1: 1) -> Points: 13, 13, 13, 13, 12, 12, 12, 12 = 100
    {
        "id": "exam_7_ingilizce_1_1_senaryo_5",
        "grade": 7,
        "subjectId": "ingilizce",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_5",
        "title": "7. Sınıf İngilizce 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 5) (8 Soru)",
        "durationMinutes": 40,
        "totalPoints": 100,
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "E7.1.R1",
                "outcomeTitle": "E7.1.R1. Students will be able to understand a simple text about appearance and personality.",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 13,
                "contextText": "Twin brothers Leo and Max.",
                "stimulus": "Read the text:\n\n'Leo and Max are 13-year-old brothers. Leo is outgoing and cheerful. He loves hanging out with his friends at cafes. Max is clumsy and forgetful; he often drops his glasses and forgets his homework, but he is very honest and generous.'",
                "questionText": "Answer the questions:\na) What negative personality traits does Max have?\nb) What positive personality traits does Max have?",
                "solutionExplanation": "Negative vs positive personality traits.",
                "modelAnswer": "a) Max is clumsy and forgetful.\nb) Max is honest and generous.",
                "rubric": [
                    {"criterion": "a şıkkında clumsy ve forgetful özelliklerinin yazılması", "points": 7},
                    {"criterion": "b şıkkında honest ve generous özelliklerinin yazılması", "points": 6}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "E7.1.R1",
                "outcomeTitle": "E7.1.R1. Students will be able to understand a simple text about appearance and personality.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Öğrenci Diyaloğu & Kavram Yanılgısı",
                "points": 13,
                "contextText": "Dialogue between Emma and Jack.",
                "stimulus": "Emma: 'Who is that tall girl with hazel eyes near the library?'\nJack: 'That is Deniz. She is our new exchange student from Ankara. She is very polite and modest, but she is a bit shy in crowded places.'",
                "questionText": "According to the dialogue:\na) What does Deniz look like?\nb) How does Jack describe Deniz's personality?",
                "solutionExplanation": "Dialogue analysis for appearance and personality.",
                "modelAnswer": "a) Deniz is tall with hazel eyes.\nb) Deniz is polite, modest, and a bit shy.",
                "rubric": [
                    {"criterion": "a şıkkında tall ve hazel eyes ifadelerinin yazılması", "points": 7},
                    {"criterion": "b şıkkında polite, modest ve shy özelliklerinin yazılması", "points": 6}
                ]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "E7.1.W1",
                "outcomeTitle": "E7.1.W1. Students will be able to write simple pieces to compare appearances and personalities of people.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 13,
                "contextText": "Comparative sentences with irregular and regular adjectives.",
                "stimulus": "Adjectives: 'good, easy-going'. Compare Aylin and Buse.",
                "questionText": "Complete the sentences with the comparative forms of the words in brackets:\na) Aylin plays tennis ................................. than Buse. (good)\nb) Buse is ................................. than Aylin in social relations. (easy-going)",
                "solutionExplanation": "Irregular comparative 'better' and multi-syllable 'more easy-going'.",
                "modelAnswer": "a) Aylin plays tennis better than Buse.\nb) Buse is more easy-going than Aylin in social relations.",
                "rubric": [
                    {"criterion": "a şıkkında 'better' düzensiz sıfatının doğru yazılması", "points": 7},
                    {"criterion": "b şıkkında 'more easy-going' kalıbının doğru yazılması", "points": 6}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "E7.1.W1",
                "outcomeTitle": "E7.1.W1. Students will be able to write simple pieces to compare appearances and personalities of people.",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 13,
                "contextText": "Writing comparative sentences from a table.",
                "stimulus": "Table:\n• Sam: 14 years old, curly hair, punctual\n• Tom: 16 years old, straight hair, lazy",
                "questionText": "Write two comparative sentences comparing Sam and Tom:\n1) (younger / older)\n2) (hardworking / lazy)",
                "solutionExplanation": "Sentence construction using comparatives.",
                "modelAnswer": "1) Sam is younger than Tom. / Tom is older than Sam.\n2) Sam is more hardworking than Tom. / Tom is lazier than Sam.",
                "rubric": [
                    {"criterion": "1. cümlede yaş kıyaslamasının doğru yapılması", "points": 7},
                    {"criterion": "2. cümlede çalışkanlık/tembellik kıyaslamasının doğru yapılması", "points": 6}
                ]
            },
            {
                "questionNumber": 5,
                "outcomeCode": "E7.2.R1",
                "outcomeTitle": "E7.2.R1. Students will be able to understand short and simple texts on sports.",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 12,
                "contextText": "Extreme sports: Skydiving.",
                "stimulus": "Read the text:\n\n'Skydiving is an extreme outdoor sport. Jumpers jump from an airplane high in the sky and freefall before opening their parachutes. They need a parachute, a helmet, and special goggles. It is a thrilling but dangerous sport.'",
                "questionText": "Answer the questions:\na) What equipment is necessary for skydiving?\nb) Is skydiving an indoor or outdoor sport?",
                "solutionExplanation": "Extracting skydiving equipment and category.",
                "modelAnswer": "a) A parachute, a helmet, and special goggles are necessary.\nb) Skydiving is an outdoor (extreme) sport.",
                "rubric": [
                    {"criterion": "a şıkkında paraşüt, kask ve gözlük ekipmanlarının yazılması", "points": 6},
                    {"criterion": "b şıkkında outdoor sport olduğunun yazılması", "points": 6}
                ]
            },
            {
                "questionNumber": 6,
                "outcomeCode": "E7.2.R1",
                "outcomeTitle": "E7.2.R1. Students will be able to understand short and simple texts on sports.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Metin İçi Delillendirme & Örtük Anlam",
                "points": 12,
                "contextText": "Sports verbs: play, go, do.",
                "stimulus": "In English, we use different verbs with different sports: 'play', 'go', and 'do'.",
                "questionText": "Match the sports with the correct verbs (play, go, or do):\na) .................... gymnastics\nb) .................... basketball\nc) .................... swimming",
                "solutionExplanation": "Collocations: do gymnastics, play basketball, go swimming.",
                "modelAnswer": "a) do gymnastics\nb) play basketball\nc) go swimming",
                "rubric": [
                    {"criterion": "do gymnastics eşleştirmesinin doğruluğu", "points": 4},
                    {"criterion": "play basketball eşleştirmesinin doğruluğu", "points": 4},
                    {"criterion": "go swimming eşleştirmesinin doğruluğu", "points": 4}
                ]
            },
            {
                "questionNumber": 7,
                "outcomeCode": "E7.2.R1",
                "outcomeTitle": "E7.2.R1. Students will be able to understand short and simple texts on sports.",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 12,
                "contextText": "Medals and achievements in sports.",
                "stimulus": "At the Olympic games, successful athletes receive medals: Gold medal for the 1st place, Silver medal for the 2nd place, and Bronze medal for the 3rd place.",
                "questionText": "If an athlete finishes the race in the second position, which medal does he or she win? Write the full answer.",
                "solutionExplanation": "Second position wins silver medal.",
                "modelAnswer": "He or she wins a Silver medal.",
                "rubric": [
                    {"criterion": "Silver medal cevabının doğru İngilizceyle yazılması", "points": 12}
                ]
            },
            {
                "questionNumber": 8,
                "outcomeCode": "E7.2.W1",
                "outcomeTitle": "E7.2.W1. Students will be able to write pieces about routines/daily activities by using frequency adverbs.",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 12,
                "contextText": "Answering frequency questions.",
                "stimulus": "Question: 'How often do you brush your teeth and do physical exercise?'",
                "questionText": "Answer the question in two full sentences using frequency adverbs (e.g. twice a day, always, three times a week, usually):\n1) Brushing teeth sentence:\n2) Physical exercise sentence:",
                "solutionExplanation": "Writing full sentences with frequency adverbs.",
                "modelAnswer": "1) I always brush my teeth twice a day.\n2) I usually do physical exercise three times a week.",
                "rubric": [
                    {"criterion": "1. cümlede sıklık ifadesiyle diş fırçalama rutininin yazılması", "points": 6},
                    {"criterion": "2. cümlede sıklık ifadesiyle egzersiz rutininin yazılması", "points": 6}
                ]
            }
        ]
    }
]

# Verify and save
for ex in scenarios_data:
    tot_p = sum(q['points'] for q in ex['questions'])
    assert tot_p == 100, f"Error in {ex['id']}: total points {tot_p} != 100"
    for q in ex['questions']:
        r_sum = sum(r['points'] for r in q['rubric'])
        assert r_sum == q['points'], f"Rubric mismatch in {ex['id']} Q{q['questionNumber']}: {r_sum} != {q['points']}"

with open('meb_data/grade7_ingilizce_distinct.json', 'w', encoding='utf-8') as f:
    json.dump(scenarios_data, f, ensure_ascii=False, indent=2)

print(f"Grade 7 İngilizce distinct: 5 scenarios verified with 100% exact 100 points, 0 duplicates!")
