first = open("first.txt")
second = open("second.txt")
merged = open("merged.txt", "w")
"""str1 = first.readline()
indented = first.readline()
str2 = second.readline()
print(str1)
print(str2)
merged.write(str1)
merged.write(str2)
"""

def stringToWords (line): 
	"""turns a string into an alphabetized list of words

	>>> stringToWords("Hello World")
	["Hello", "World"]

	"""
	temp = ""
	bank = []
	for _ in line:
		if _ == " ":
			bank.append(temp)
			temp = ""
		else:
			temp = temp + _.lower()
	bank.append(temp)
	return [element for element in bank if element != ""] 

def wordsToString (strings):
	str = ""
	for string in strings:
		str = str + " " + string
	return str

def fileToList (file):
	strings = []
	for line in file:
		strings.append(line)
	return [stringToWords(string) for string in strings]

def merge (arr1, arr2): 
	"""merges two 2-level arrays with the most similar arrays adjacent"""
	"""for number in range(len(arry1)):
		currMax = 0
		maxArray = None
		wordArray = stringToWords(element)
		for candidate in arr2:
			if wordsInCommon(candidate, element) > currMax:
				currMax = wordsInCommon(candidate, element)"""
	newArray = []
	if len(arr1) >= len(arr2):
		for element in arr1:
			newArray.append(element)
			if len(arr2) > 0:
				newArray.append(max(arr2, key = lambda arr : wordsInCommon(element,arr)))
				arr2.remove(max(arr2, key = lambda arr : wordsInCommon(element,arr)))
				newArray.append("\n")
	if len(arr2) > len(arr1):
		for element in arr2:
			newArray.append(element)
			if len(arr1) > 0:
				newArray.append(max(arr1, key = lambda arr : wordsInCommon(element,arr)))
				arr1.remove(max(arr1, key = lambda arr : wordsInCommon(element,arr)))
				newArray.append("\n")
	return newArray


def wordsInCommon (arr1, arr2):
	return len(set(arr1).intersection(arr2))

x = fileToList(first)
y = fileToList(second)
for line in merge(x,y):
	merged.write(wordsToString(line))
print("finished")
#merged.write("Hello")


