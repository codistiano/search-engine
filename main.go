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

func mapper(file string, tupleDict []dict) ([]dict, error) {
	fullPath := path.Join("./seed_text/", file)
	result, err := os.ReadFile(fullPath)

	if err != nil {
		return []dict{}, err
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

	return tupleDict, nil
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
		output, err := mapper(file, dictTuple)

		if err != nil {
			fmt.Println(err)
			continue
		}
		dictTuple = append(dictTuple, output...)
	}

	sort.Slice(dictTuple, func(i, j int) bool {
		return dictTuple[i].freq > dictTuple[j].freq
	})

	// fmt.Println(dictTuple[:10])

	result, err := wordsIndex.Search("nothingelse")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(result)
	}

	fmt.Println("Hello! from Search Engine!")
}
