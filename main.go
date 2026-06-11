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

func mapper(file string, globalCounts map[string]int) error {
	fullPath := path.Join("./seed_text/", file)
	result, err := os.ReadFile(fullPath)

	if err != nil {
		return err
	}

	content := strings.Fields(string(result))

	stopWords := []string{"the", "a", "an", "is", "in", "at", "on", "of", "and", "to", "by", "as", "be", "for", "from", "it", "that", "with", "or", "are", "|", "which", "this", "will"}
	filteredWords := make(map[string]bool)

	for _, word := range stopWords {
		filteredWords[word] = true
	}

	for _, word := range content {
		word = normalize(word)
		if word == "" || filteredWords[word] {
			continue
		}
		globalCounts[word] += 1
		wordsIndex.BuildIndex(file, word)
	}

	return nil
}

func normalize(word string) string {
    return strings.ToLower(strings.Trim(strings.TrimSpace(word), ".,!?;:\"'()[]"))
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

	globalCounts := make(map[string]int)
	
	for _, file := range txtFiles {
	    err := mapper(file, globalCounts) 
	    if err != nil {
	        fmt.Println(err)
	        continue
	    }
	}

	var dictTuple []dict
	for k, v := range globalCounts {
	    dictTuple = append(dictTuple, dict{k, v})
	}

	sort.Slice(dictTuple, func(i, j int) bool {
		return dictTuple[i].freq > dictTuple[j].freq
	})

	fmt.Println(dictTuple[:10])

	result, err := wordsIndex.Search("electric")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(result)
	}

	fmt.Println("Hello! from Search Engine!")
}
