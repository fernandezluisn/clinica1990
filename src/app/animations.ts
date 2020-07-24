import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Login <=> Inicio', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    //////////////////////////////
    transition('Login <=> Registrarse', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-in', style({ right: '100%'}))
        ]),
        query(':enter', [
          animate('1000ms ease-in', style({ right: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),/////////////////////////////////////
    transition('Inicio <=> HistoriaClinica', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-in', style({right:'100%'}))
        ]),
        query(':enter', [
          animate('1000ms ease-in', style({left:'100%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    ////////////////////////////////
      transition('Inicio <=> altaUsuario', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-in', style({transform: 'translateY(100%)'}))
        ]),
        query(':enter', [
          animate('1000ms ease-in', style({transform: 'translateY(-100%)'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    ////////////////////////////////////////////////////
    transition('Inicio <=> Admin', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-in', style({transform: 'translateY(100%)'}))
        ]),
        query(':enter', [
          animate('1000ms ease-in', style({transform: 'translateY(-100%)'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    //////////////////////////////////////////////////////////////
    transition('Inicio <=> Registrarse', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-in', style({transform: 'translateY(100%)'}))
        ]),
        query(':enter', [
          animate('1000ms ease-in', style({transform: 'translateY(-100%)'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);