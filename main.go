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

func main() {
	result, err := os.ReadFile("./words.txt")

	if err != nil {
		fmt.Print("Error: File not found!")
		return
	}

	content := strings.Fields(string(result))

	counterMap := make(map[string]int)

	for _, word := range content {
		counterMap[word] += 1
	}

	var dictTuple []dict

	for k, v := range counterMap {
		dictTuple = append(dictTuple, dict{k, v})
	}

	sort.Slice(dictTuple, func(i, j int) bool {
		return dictTuple[i].freq > dictTuple[j].freq
	})

	fmt.Println(dictTuple)
	
	fmt.Println("Hello! from Search Engine!")
}