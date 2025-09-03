# 🍅 Pomodoro App - React Native

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)

## Descripción

Una aplicación de temporizador Pomodoro simple y elegante desarrollada con React Native y Expo. Ayuda a los usuarios a gestionar su tiempo alternando entre períodos de trabajo y descanso, siguiendo la popular técnica Pomodoro.

---

## ✨ Características Principales

- **Tres Modos de Temporizador:**
    - 🍅 **Pomodoro:** Período de trabajo de 25 minutos.
    - ☕ **Descanso Corto:** Pausa de 5 minutos.
    - 🚶 **Descanso Largo:** Pausa de 10 minutos.
- **Control Total:** Inicia, detiene y cambia entre modos con facilidad.
- **Ciclos Automáticos:** La aplicación cambia automáticamente entre los modos de trabajo y descanso.
- **Interfaz Dinámica:** El color de fondo se adapta al modo actual para una mejor experiencia visual.
- **Retroalimentación Auditiva:**
    - Sonido de clic al interactuar con el temporizador.
    - Sonido de alarma al completar un ciclo.

---

## 🚀 Instalación y Ejecución

Para poner en marcha este proyecto en tu entorno local, sigue estos sencillos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd ReactNative_Pomodoro
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia la aplicación con Expo:**
    ```bash
    npx expo start
    ```
    A continuación, escanea el código QR con la aplicación **Expo Go** en tu dispositivo móvil (iOS o Android).

---

## 🛠️ Tecnologías Utilizadas

- **React Native:** Framework para construir aplicaciones nativas usando React.
- **Expo:** Plataforma para hacer aplicaciones universales de React.
- **Expo AV:** Para la reproducción de sonidos y alarmas.

---

## 🔮 Posibles Mejoras

- [ ] Implementar un contador de ciclos para activar el descanso largo (`BREAK`) automáticamente.
- [ ] Añadir una pantalla de configuración para personalizar la duración de los temporizadores.
- [ ] Guardar el estado de la aplicación (ciclo actual, tiempo) para que persista entre sesiones.
- [ ] Mejorar la accesibilidad (VoiceOver, TalkBack).
- [ ] Añadir notificaciones push para avisar del fin de un ciclo cuando la app está en segundo plano.
