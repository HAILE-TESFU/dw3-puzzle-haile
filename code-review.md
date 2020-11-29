# TASK ONE : CODE-REVIEW

## CODE SMELLS

1. Two tests are failing in the reading-list.reducer.spec.ts

```
   describe('Books Reducer', () => {
   describe('valid Books actions', () => {
    let state: State;

    beforeEach(() => {
      state = readingListAdapter.setAll(
        [createReadingListItem('A'), createReadingListItem('B')],
        initialState
      );
    });

    it('loadBooksSuccess should load books from reading list', () => {
      const list = [
        createReadingListItem('A'),
        createReadingListItem('B'),
        createReadingListItem('C')
      ];
      const action = ReadingListActions.loadReadingListSuccess({ list });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(3);
    });

    it('failedAddToReadingList should undo book addition to the state', () => {
      const action = ReadingListActions.failedAddToReadingList({
        book: createBook('B')
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A']);
    });

    it('failedRemoveFromReadingList should undo book removal from the state', () => {
      const action = ReadingListActions.failedRemoveFromReadingList({
        item: createReadingListItem('C')
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A', 'B', 'C']);
    });
  });
```

- test case 2 and 3 will not change the data, if the process fails. So the expectation must be as follow for both cases

```
expect(result.ids).toEqual(['A', 'B']);
```

2. in the boo-search.component.ts. There is no unsubscribe for the following subscription

```
 ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }
```

- must add ngOnDestroy life cylce to destroy it or use the async pipe operator.

3. There is no sppiner when the searched items are loading you could add sppiner.

## ACCESSIBILITY

1. Lighthouse

- Performance: 40%
- Accessibility: 87%

  ```
  a. Buttons do not have an accessible name;
  b. Background and foreground colors do not have a sufficient contrast ratio.
  ```

* Best Practice:93%
* SEO : 89%
* Web Progressive

2. When using the tab key, it does not go to the JavaScript button for searching.
