package main

import (
	"fmt"
	"os"
	"path"
	"sort"
	"strings"
)

type dict struct {
	word string
	freq int
}

func mapper(file string, tupleDict []dict) []dict {
	fullPath := path.Join("./seed_text/", file)
	result, err := os.ReadFile(fullPath)

	if err != nil {
		fmt.Print("Error: File not found!")
		return []dict{}
	}

	content := strings.Fields(string(result))

	counterMap := make(map[string]int)

	for _, word := range content {
		word := strings.ToLower(strings.Trim(word, ".,!?;:\"'()[]"))
		if word == "" {
		    continue
		}
		counterMap[word] += 1
		wordsIndex.BuildIndex(file, word)
	}

	for k, v := range counterMap {
		tupleDict = append(tupleDict, dict{k, v})
	}

	return tupleDict
}

func main() {
	txtFolderPath := "./seed_text/"
	files, err := os.ReadDir(txtFolderPath)

	if err != nil {
		fmt.Println("Error: no files were found!")
		return
	}

	txtFiles := []string{}

	for _, entry := range files {
		if strings.HasSuffix(entry.Name(), ".txt") {
			txtFiles = append(txtFiles, entry.Name())
		}
	}

	var dictTuple []dict

	for _, file := range txtFiles {
		dictTuple = mapper(file, dictTuple)
	}

	sort.Slice(dictTuple, func(i, j int) bool {
		return dictTuple[i].freq > dictTuple[j].freq
	})

	// fmt.Println(dictTuple[:10])
	fmt.Println(wordsIndex.Search("electric"))

	fmt.Println("Hello! from Search Engine!")
}
