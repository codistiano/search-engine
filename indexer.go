package main

import (
	"fmt"
	"slices"
	"strings"
)

type Index map[string][]string

type NotFoundError struct {
	word string
}

func (notFoundError NotFoundError) Error() string {
	return fmt.Sprintf(
		"'%s' keyword not found!",
		notFoundError.word,
	)
}

var wordsIndex = Index{}

func(i Index) BuildIndex(src, word string) {
	available := slices.Contains(i[word], src)

	if !available {
		i[word] = append(i[word], src)
	}
}

func(i Index) Search(word string) ([]string, error) {
	word = strings.ToLower(word)
	
	if len(i[word]) == 0 {
		return nil, NotFoundError{word: word}
	}
	
	return i[word], nil
}