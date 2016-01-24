function shuffle(array) {
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
};

function fourRand(range, exception) {
    var randList = [exception];
    while (randList.length < 4) {
        var potential = Math.floor(Math.random() * range);
        if (randList.indexOf(potential) === -1) {
            randList.push(potential);
        }
    }
    randList = shuffle(randList);
    return randList;
}

function generateQuestions(wordList, defList) {
    for (i = 0; i < wordList.length; i++) {
        console.log("What is " + wordList[i] + "?");
        var answerList = fourRand(wordList.length, i);
        var myChoices = "Choices: ";
        myChoices += defList[answerList[0]];
        for (j = 1; j < 4; j++) {
            myChoices += ", " + defList[answerList[j]];
        }
        console.log(myChoices);
    }
};

function parseText(fileContents) {

    console.log(fileContents);

    var colonArray = [];
    var stringArray = fileContents.split("\n");
    var defHash = new Object();
    defHash.wordList = [];
    defHash.defList = [];
    for (i = 0; i < stringArray.length; i++) {
        if (stringArray[i].search(":") >= 0) {
            colonArray.push(i);
        }
    }
    for (i = colonArray[0]; i < stringArray.length; i++) {
        var splitter = stringArray[i].split(":");
        var mainWord = splitter[0];
        var def = splitter[1];
        var j = i + 1;
        while (colonArray.indexOf(j) === -1 && j < stringArray.length) {
            def += " " + stringArray[j];
            i++;
            j++;
        }
        defHash.wordList.push(mainWord);
        defHash.defList.push(def);
    }
    generateQuestions(defHash.wordList, defHash.defList);
};
