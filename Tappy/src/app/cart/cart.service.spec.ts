import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DatabaseService } from '../_shared/data/database.service';
import { DatabaseManager } from '../_shared/data/database.manager';
import { MenuService } from '../menu/menu.service';
import { MenuItemCategory } from '../_shared/_schemas/menu.schema';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({}),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
    stateChanges: () => new BehaviorSubject({}),
  }),
};

const FireauthStub = {
  auth: of({ uid: 'ABC123' }),
  authState: of({ uid: 'myUidTest', email: 'myemail@test.io', emailVerified: true })
};

const DatabaseManagerStub = {
  watchItems: () => new BehaviorSubject({}),
};

const DatabaseServiceStub = {
  orderManager: DatabaseManagerStub,
  menuManager: DatabaseManagerStub
};


const MenuServiceStub = {
  items: [
    {
      db: {
        id: '12',
        name: 'Cézár saláta',
        description: 'Saláta csirkemellel, uborkával, pirított kenyérkockával',
        category: MenuItemCategory.Starter,
        price: 1000,
        isSpicy: false,
        isVegetarian: false
      }
    },
    {
      db: {
        id: '5',
        name: 'Bableves',
        description: 'Tejfölös csülkös',
        category: MenuItemCategory.Soup,
        price: 700,
        isSpicy: false,
        isVegetarian: false
      },
    }
  ],
  menuManager: DatabaseManagerStub
};

describe('CartService', () => {


  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore, useValue: FirestoreStub },
      { provide: AngularFireAuth, useValue: FireauthStub },
      { provide: Router },
      { provide: DatabaseManager, useValue: DatabaseManagerStub },
      { provide: DatabaseService, useValue: DatabaseServiceStub },
      { provide: MenuService, useValue: MenuServiceStub },

    ],
  }));

  it('add to cart: bill = 1000 Huf', () => {
    const service = TestBed.get(CartService);
    service.addToCart('12');
    expect(service.counter).toEqual(1);
    expect(service.cartContent.db.content.size).toEqual(1);
    expect(service.bill).toEqual(1000);
  });

  it('add to cart: bill = 6300 Huf ', () => {
    const service = TestBed.get(CartService);
    for (let i = 1; i <= 9; i++) {
      service.addToCart('5');
    }
    expect(service.counter).toEqual(9);
    expect(service.bill).toEqual(6300);
  });


  it('add to cart: bill = 9000 Huf ', () => {
    const service = TestBed.get(CartService);
    for (let i = 1; i <= 9; i++) {
      service.addToCart('12');
    }
    expect(service.counter).toEqual(9);
    expect(service.bill).toEqual(9000);
  });

  it('add to cart: bill = 10000 Huf (fake exception has been catched)', () => {
    const service = TestBed.get(CartService);
    for (let i = 1; i <= 9; i++) {
      service.addToCart('12');
    }
    const errMsg = service.addToCart('12').message;
    expect(errMsg).toBe('TAPPY - Fake bug.');
    expect(service.bill).toEqual(10000);
  });

});
