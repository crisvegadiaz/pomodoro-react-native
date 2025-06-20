# Documentación del Proyecto Pomodoro

## Descripción General

Esta es una aplicación Pomodoro simple construida con React Native y Expo. Permite a los usuarios gestionar su tiempo utilizando la técnica Pomodoro, alternando entre períodos de trabajo y descanso. La aplicación incluye retroalimentación auditiva para el inicio/parada del temporizador y para las alarmas.

---

## Archivo Principal: `App.js`

El archivo `App.js` es el componente principal de la aplicación.

### Funcionalidad Principal

#### Gestión del Temporizador

- Maneja los estados de **trabajo** (`POMO`), **descanso corto** (`SHORT`) y **descanso largo** (`BREAK`).
- Permite iniciar y detener el temporizador.
- Cambia automáticamente entre los modos de trabajo y descanso cuando el tiempo llega a cero.
    - **Nota:** La lógica de cambio automático descrita en `useEffect` principalmente alterna entre `POMO` y `SHORT`. El manejo del ciclo completo incluyendo `BREAK` (descanso largo) de forma automática podría requerir lógica adicional (ej. contador de pomodoros).
- Permite al usuario seleccionar manualmente el modo (`POMO`, `SHORT`, `BREAK`) a través del componente `Header`. Esta selección actualiza el `currentMode` y `time` en `App.js` a través de las props `setCurrentTime` y `setTime`.
 
#### Interfaz de Usuario

- Muestra el tiempo restante.
- Permite al usuario seleccionar el modo actual (Pomodoro, Descanso Corto, Descanso Largo).
- Cambia el color de fondo según el modo actual.
- Proporciona un botón para iniciar/detener el temporizador.

#### Retroalimentación Auditiva

- Reproduce un sonido de clic al iniciar/detener el temporizador.
- Reproduce un sonido de alarma cuando un ciclo de trabajo o descanso finaliza.

---

## Estado (`State`)

El componente `App` utiliza los siguientes estados:

- **isWorking** (`boolean`): Indica si el período actual es de trabajo (`true`) o descanso (`false`). Se inicializa en `false` en `App.js` (aunque `currentMode` se inicializa en `"POMO"`). Se actualiza automáticamente al finalizar un ciclo.
- **time** (`number`): Tiempo restante en segundos para el período actual. Inicialmente `25 * 60` (25 minutos).
- **currentTime** (`string`): Modo actual del temporizador. Puede ser `"POMO"`, `"SHORT"` o `"BREAK"`.
    - **Nota:** La inicialización `useState("POMO" | "SHORT" | "BREAK")` es una representación del tipo, no un valor de inicialización válido. Debe ser un valor string específico, por ejemplo, `useState("POMO")`. Este estado se actualiza tanto automáticamente al finalizar un ciclo como manualmente por el usuario.
- **isActive** (`boolean`): Indica si el temporizador está activo (`true`) o pausado (`false`).

---

## Efectos (`useEffect`)

El componente utiliza un hook `useEffect` para manejar la lógica del temporizador:

- **Dependencias:** `[isActive, time, isWorking]` (según `App.js`).
- **Funcionalidad:**
    - Si `isActive` es `true` y `time` > 0, configura un intervalo que decrementa `time` en 1 cada segundo.
    - Si `isActive` es `false` o `time` llega a 0 (y `isActive` era `true`), limpia el intervalo.
    - Cuando `time` llega a 0 (y el temporizador estaba activo), se realizan las siguientes acciones:
        - Se detiene el temporizador (`setIsActive(false)`).
        - Reproduce el sonido de alarma.
        - Se actualiza el estado para el siguiente ciclo:
            - El estado `isWorking` se invierte (`setIsWorking(prev => !prev)`).
            - Se determina el `nextMode` basándose en el valor de `isWorking` *antes* de la inversión para esta transición:
                - Si `isWorking` era `true` (es decir, se acaba de terminar un período de trabajo), el `nextMode` es `"SHORT"`.
                - `setCurrentTime("SHORT")`.
                - `setTime` a la duración configurada para descanso corto (ej. `5 * 60` segundos).
            - Si `isWorking` era `false` (es decir, se acaba de terminar un descanso), el `nextMode` es `"POMO"`.
                - `setCurrentTime("POMO")`.
                - `setTime` a la duración configurada para Pomodoro (ej. `25 * 60` segundos).
    - **Función de Limpieza:** `clearInterval(interval)` se ejecuta cuando `isActive` o `time` cambian, o cuando el componente se desmonta, para evitar múltiples intervalos y fugas de memoria.

---

## Funciones

- **playSoundClick():** Asíncrona. Reproduce el sonido `click.wav` (previamente cargado) usando `replayAsync()` de `expo-av`.
- **playSoundAlarma():** Asíncrona. Reproduce el sonido `alarma.mp3` (previamente cargado) usando `replayAsync()` de `expo-av`.
- **handleStartStop():** Reproduce el sonido de clic y alterna el estado de `isActive`.
- **Selección de Modo (en `Header.js`):** El componente `Header` recibe las funciones `setCurrentTime` y `setTime` como props desde `App.js`. Cuando el usuario selecciona un modo en `Header`, este utiliza dichas funciones para actualizar directamente los estados `currentMode` y `time` en `App.js`. Adicionalmente, se recomienda que al cambiar de modo manualmente, el temporizador (`isActive`) se detenga.

---

## Renderizado (UI)

- Usa `SafeAreaView` como contenedor principal.
- El color de fondo cambia dinámicamente según el valor de `colors[currentTime]`.
    - En `App.js`, el color de fondo se establece con `COLORS[MODES[currentMode]]`.
        - `COLORS` es un array: `["#F7DC6F", "#A2D9CE", "#D7BDE2"]`
        - `MODES` es un objeto que mapea nombres de modo a índices: `{ POMO: 0, SHORT: 1, BREAK: 2 }`
    - **Sugerencia (alternativa):** `colors` podría ser un objeto para un acceso más directo como `colors[currentMode]`:
        ```js
        const colors = {
            POMO: "#F7DC6F",  // Ejemplo
            SHORT: "#A2D9CE", // Ejemplo
            BREAK: "#D7BDE2", // Ejemplo
        };
        ```
- Muestra un `StatusBar` de Expo con estilo `"dark"`.
- Un `View` principal con padding y borde.
- Aplica `paddingTop` condicional para Android.
- Título: **Pomodoro**.
- Renderiza el componente `Header` (para cambiar de modo).
- Renderiza el componente `Time` (para mostrar el tiempo restante).
- Un botón (`TouchableOpacity`) para iniciar/detener el temporizador, con texto dinámico `"START"`/`"STOP"`.

---

## Estilos (`StyleSheet`)

- **container:** Ocupa todo el espacio disponible (`flex: 1`).
- **text:** Estilo para el título.
- **button:** Estilo para el botón de `"START"`/`"STOP"`.

---

## Componentes Adicionales

- `./src/components/Header.js`: Selección de modo del temporizador.
- `./src/components/Time.js`: Muestra el tiempo formateado.

---

## Archivos de Activos (`assets`)

- `./assets/click.wav`: Sonido para interacción con el botón.
- `./assets/alarma.mp3`: Sonido para el final de un ciclo.

---

## Posibles Mejoras y Consideraciones
- **Inicialización de `isWorking`:** Considerar inicializar `isWorking` a `true` si `currentMode` se inicializa a `"POMO"` para mayor consistencia interna del estado inicial.
- **Mapeo de `currentMode` a `colors`:** La implementación actual (`COLORS[MODES[currentMode]]`) es funcional. La sugerencia de usar un objeto directo para `colors` (ej. `colors[currentMode]`) es una alternativa de estilo.
- **Lógica de cambio de tiempo en `useEffect`:** La descripción en la sección `Efectos` ha sido actualizada para reflejar con mayor precisión cómo `isWorking` (su valor *antes* de la inversión) se utiliza para determinar el `nextMode`.
- **Gestión de Descanso Largo (`BREAK`):** La lógica automática actual solo alterna entre `POMO` y `SHORT`. Para incluir `BREAK` automáticamente (ej. después de N pomodoros) o si su duración al ser seleccionado manualmente debe ser diferente, se necesitaría lógica adicional. `App.js` define `DURATIONS.BREAK` (10 minutos), que se usaría si `Header` establece `currentMode` a `"BREAK"`.
- **Carga y Descarga de Sonidos:** `App.js` ya implementa la carga de sonidos una vez al inicio de la aplicación (en un `useEffect` con dependencias vacías) y su descarga al desmontar el componente, lo cual es una buena práctica para el rendimiento.

---

## Configuración del Proyecto

- **`babel.config.js`:** Usa `babel-preset-expo` y `api.cache(true)`.
- **`package-lock.json`:** Detalla versiones exactas de dependencias.
    - Principales: `expo`, `expo-av`, `expo-status-bar`, `react`, `react-native`.
    - Dev: `@babel/core`.
