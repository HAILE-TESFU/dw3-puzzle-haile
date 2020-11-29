import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import {
  addToReadingList,
  removeFromReadingList,
} from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';
import { Subscription } from 'rxjs';

@Injectable()
export class UndoActionService implements OnDestroy {
  subscription: Subscription;
  snackBarRef: MatSnackBarRef<SimpleSnackBar>;

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  undoRemovingBookFromReadingList(book: Book, action) {
    const bookRemovedFromReadingList = 'book removed from reading list';
    const duration = 2000;

    const snackBarRef = this.snackBar.open(bookRemovedFromReadingList, action, {
      duration: duration,
    });

    this.subscription = snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({ book }));
    });
  }

  undoAddingBookToList(book: Book, action) {
    const bookAddedToReadingList = 'book added  to reading list';
    const duration = 2000;

    const snackBarRef = this.snackBar.open(bookAddedToReadingList, action, {
      duration: duration,
    });

    const item = { bookId: book.id, ...book };

    this.subscription = snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(removeFromReadingList({ item }));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
