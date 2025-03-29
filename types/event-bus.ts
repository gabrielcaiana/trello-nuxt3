export interface AuthFormEvent {
  page: 'login' | 'register';
}

export interface ToastEvent {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface EventBus {
  $on(event: 'auth:form', callback: (data: AuthFormEvent) => void): void;
  $emit(event: 'auth:form', data: AuthFormEvent): void;
  $on(event: 'toast', callback: (data: ToastEvent) => void): void;
  $emit(event: 'toast', data: ToastEvent): void;
}

declare module '#app' {
  interface NuxtApp {
    $bus: EventBus;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $bus: EventBus;
  }
} 