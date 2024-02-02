# Reportes de Daños DAL

Para añadir plataforma Android a proyecto de cordoba utilizar el comando:

```
cordova platform add android
```

Para construir apk de Android usando cordova seguir los siguientes pasos:

* Instalar Java SDK 11 o superior

* Instalar Android Studio

* Instalar SDK de Android

* Generar proyecto de Android ejecutando el siguiente comando de cordova:

```
cordova build android
```

Nota: Es posible que lanze errores, ignorar de momento

* Abrir proyecto de android ubicado en la subcarpeta ReporteDAL\platfroms\android en Android Studio

* Una vez abierto el proyecto en el menu irse a Build -> Build Bundle(s) / APK(s) -> APK(s)

* Ubicar la APK generada en: ReporteDAL\platforms\android\app\build\outputs\apk\debug
