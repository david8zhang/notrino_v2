
// Parse file contents and turn them into quizzes
function parseString(fileContents) {
    var concept_mapping = {};
    var relational_questions = {};
    var stringArr = fileContents.split("\n");
    var concept_array = [];
    for(var i = 0; i < stringArr.length; i++) {
        var string = stringArr[i];
        if(string != "" && string.charCodeAt(0) != 13) {
            if(isUpperCase(string)) {
                var new_arr = [];
                concept_mapping[string] = new_arr;
                concept_array = new_arr;
            } else {
                concept_array.push(string);
            }
        }
    }
    relational_questions = generateRelationQ(concept_mapping);
    console.log(relational_questions);
    fillblank_questions = generateFillBlankQ(concept_mapping);
    console.log(fillblank_questions);
    truefalse_questions = generateTrueFalseQ(concept_mapping);
    console.log(truefalse_questions);
}

// Generate relational questions
function generateRelationQ(kv_mapping) {
    var question_mapping = {};
    var string = "Which one of these does not relate to ";
    var count = 0;
    for(key in kv_mapping) {
        var question = string + lowerCase(key) + "?";
        var concepts = getSubConcepts(kv_mapping);
        concepts.splice(count, 1);
        question_mapping[question] = genRelationalAnswers(concepts, kv_mapping[key]);
        count = count + 1;
    }
    return question_mapping;
}

// Get sub concepts for a key-value mapping
function getSubConcepts(kv_mapping) {
    var sub_concepts = [];
    for(var key in kv_mapping) {
        sub_concepts.push(kv_mapping[key]);
    }
    return sub_concepts;
}

// Get the key concepts for a key value mapping
function getKeyConcepts(kv_mapping) {
    var key_concepts = [];
    for(var key in kv_mapping) {
        key_concepts.push(key);
    }
    return key_concepts;
}


// Generate a list of answers where one is wrong
function genRelationalAnswers(allSubs, correctSubs) {
    var answers = [];
    var wrongSet = Math.floor(Math.random() * (allSubs.length - 1));
    var replacedIndex = Math.floor(Math.random() * (correctSubs.length - 1));
    var randWrong = Math.floor(Math.random() * (allSubs[wrongSet].length - 1));
    for(var i = 0; i < correctSubs.length; i++) {
        if(i == replacedIndex) {
            answers[i] = allSubs[0][randWrong];
        } else {
            answers[i] = correctSubs[i];
        }
    }
    return shuffle2(answers);
}

// Generate a fill in the blank question
function generateFillBlankQ(kv_mapping) {
    var question_mapping = {};
    var count = 0;
    for(var key in kv_mapping) {
        var sub_concepts = kv_mapping[key];
        var randIndex = Math.floor(Math.random() * (sub_concepts.length));
        var question = "\"" + sub_concepts[randIndex] + "\" best describes which concept?";
        var concepts = getKeyConcepts(kv_mapping);
        concepts.splice(count, 1);
        question_mapping[question] = genFillBlankAnswers(concepts, key);
        count = count + 1;
    }
    return question_mapping;
}

// Generate fill in the blank answers
function genFillBlankAnswers(allconcepts, key) {
    var answers = [];
    var randomTerm = Math.floor(Math.random() * (allconcepts.length - 1));
    for (var i = 0; i < allconcepts.length; i++) {
        if(i == 4) {
            return answers;
        }
        if(i == randomTerm) {
            answers[i] = key;
        } else {
            answers[i] = allconcepts[i];
        }
    }
    return shuffle2(answers);
}

// Generate a true false question
function generateTrueFalseQ(kv_mapping) {
    var question_mapping = {};
    var answers = [true, false];
    var count = 0;
    for(var key in kv_mapping) {
        var sub_concepts = kv_mapping[key];
        var trueFalse = Math.random();
        if(trueFalse >= 0.5) {
            var randTerm = Math.floor(Math.random() * (sub_concepts.length - 1));
            var question = sub_concepts[randTerm] + " refers to " + key;
            question_mapping[question] = answers;
        } else {
            var subconcepts = getSubConcepts(kv_mapping);
            var randSet = Math.floor(Math.random() * (subconcepts.length - 1));
            var wrongSet = subconcepts[randSet];
            var randWrong = Math.floor(Math.random() * (wrongSet.length - 1));
            var question = wrongSet[randWrong] + " refers to " + key;
            question_mapping[question] = shuffle2(answers);
        }
        count = count + 1;
    }
    return question_mapping;
}

// Check if a string is all upperCase
function isUpperCase(string) {
    for(var i = 0; i < string.length; i++) {
        var character = string.charAt(i);
        if(character != character.toUpperCase()) {
            return false;
        }
    }
    return true;
}

// Convert the string to all lowercase
function lowerCase(string) {
    var lowered = "";
    for(var i = 0; i < string.length; i++) {
        lowered = lowered + string.charAt(i).toLowerCase();
    }
    return lowered;
}

// Shuffle the answer array
function shuffle2(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle
    while(currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex = currentIndex - 1;

        // Swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}