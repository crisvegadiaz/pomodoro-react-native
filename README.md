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
- Permite al usuario seleccionar manualmente el modo (`POMO`, `SHORT`, `BREAK`), lo que actualiza el temporizador y el estado de la aplicación correspondientemente.
 
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

- **isWorking** (`boolean`): Indica si el usuario está en un período de trabajo (`true`) o descanso (`false`).
- **time** (`number`): Tiempo restante en segundos para el período actual. Inicialmente `25 * 60` (25 minutos).
- **currentTime** (`string`): Modo actual del temporizador. Puede ser `"POMO"`, `"SHORT"` o `"BREAK"`.
    - **Nota:** La inicialización `useState("POMO" | "SHORT" | "BREAK")` es una representación del tipo, no un valor de inicialización válido. Debe ser un valor string específico, por ejemplo, `useState("POMO")`. Este estado se actualiza tanto automáticamente al finalizar un ciclo como manualmente por el usuario.
- **isActive** (`boolean`): Indica si el temporizador está activo (`true`) o pausado (`false`).

---

## Efectos (`useEffect`)

El componente utiliza un hook `useEffect` para manejar la lógica del temporizador:

- **Dependencias:** `[isActive, time]`
- **Funcionalidad:**
    - Si `isActive` es `true`, configura un intervalo que decrementa `time` en 1 cada segundo.
    - Si `isActive` es `false`, limpia el intervalo.
    - Cuando `time` llega a 0, se realizan las siguientes acciones:
        - Se detiene el temporizador (`setIsActive(false)`).
        - Reproduce el sonido de alarma.
        - Se actualiza el estado para el siguiente ciclo:
            - El estado `isWorking` se invierte (`const newIsWorking = !isWorking; setIsWorking(newIsWorking)`).
            - Si el nuevo estado es de trabajo (`newIsWorking === true`, es decir, se acaba de terminar un descanso):
                - `setCurrentTime("POMO")`.
                - `setTime` a la duración configurada para Pomodoro (ej. `25 * 60` segundos).
            - Si el nuevo estado es de descanso (`newIsWorking === false`, es decir, se acaba de terminar un período de trabajo):
                - `setCurrentTime("SHORT")`.
                - `setTime` a la duración configurada para descanso corto (ej. `5 * 60` segundos).
    - **Función de Limpieza:** `clearInterval(interval)` se ejecuta cuando `isActive` o `time` cambian, o cuando el componente se desmonta, para evitar múltiples intervalos y fugas de memoria.

---

## Funciones

- **playSoundClick():** Asíncrona. Carga y reproduce `click.wav` usando `expo-av`.
- **playSoundAlarma():** Asíncrona. Carga y reproduce `alarma.mp3` usando `expo-av`.
- **handleStartStop():** Reproduce el sonido de clic y alterna el estado de `isActive`.
- **handleModeChange(mode):** (Función hipotética o parte del componente `Header` que interactúa con `App.js`) Actualiza `currentTime` al modo seleccionado por el usuario (ej. "POMO", "SHORT", "BREAK"), ajusta `time` a la duración correspondiente a ese modo, establece `isWorking` (`true` para "POMO", `false` para "SHORT" o "BREAK") y detiene el temporizador (`setIsActive(false)`), permitiendo al usuario iniciar el nuevo modo manualmente.

---

## Renderizado (UI)

- Usa `SafeAreaView` como contenedor principal.
- El color de fondo cambia dinámicamente según el valor de `colors[currentTime]`.
    - **Nota:** `colors` debe ser un objeto, no un array, para funcionar con strings:
        ```js
        const colors = {
            POMO: "#F7DC6F",
            SHORT: "#A2D9CE",
            BREAK: "#D7BDE2",
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

- **Inicialización de `currentTime`:** Usar un valor string específico, no una expresión de tipos.
- **Mapeo de `currentTime` a `colors`:** Usar un objeto en vez de array para los colores.
- **Lógica de cambio de tiempo en `useEffect`:** Considerar el valor invertido de `isWorking` para mayor claridad.
- **Gestión de Descanso Largo (`BREAK`):** Implementar lógica específica si se requiere una duración distinta.
- **Carga de Sonidos:** Cargar los sonidos una vez al inicio y reutilizarlos para mejor rendimiento.
- **Descarga de sonidos:** Usar `sound.unloadAsync()` al desmontar el componente.

---

## Configuración del Proyecto

- **`babel.config.js`:** Usa `babel-preset-expo` y `api.cache(true)`.
- **`package-lock.json`:** Detalla versiones exactas de dependencias.
    - Principales: `expo`, `expo-av`, `expo-status-bar`, `react`, `react-native`.
    - Dev: `@babel/core`.
