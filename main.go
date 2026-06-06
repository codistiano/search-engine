package main

import (
	"fmt"
	"os"
	"sort"

	// "slices"
	// "sort"
	"strings"
)

type dict struct {
	word string
	freq int
}

func mapper(file string, tupleDict []dict) []dict {
	result, err := os.ReadFile(file)

	if err != nil {
		fmt.Print("Error: File not found!")
		return []dict{}
	}

	content := strings.Fields(string(result))

	counterMap := make(map[string]int)

	for _, word := range content {
		counterMap[word] += 1
	}

	for k, v := range counterMap {
		tupleDict = append(tupleDict, dict{k, v})
	}

	return tupleDict
}

func main() {
	files, err := os.ReadDir("./")

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

	fmt.Println(dictTuple)

	fmt.Println("Hello! from Search Engine!")
}
