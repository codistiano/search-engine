package main

import "slices"

type Index map[string][]string

var wordsIndex = Index{}

func(i Index) BuildIndex(src, word string) {
	available := slices.Contains(i[word], src)

	if !available {
		i[word] = append(i[word], src)
	}
}

func(i Index) Search(word string) []string {
	return i[word]
}