## App de Reservas - Microservicios 

Para agregar un nuevo microservicio sigue los siguientes pasos:
1. Crea un proyecto de nest usando el siguiente comando y usa tu gestor de paquetes preferido (gateway y reservas usan __yarn__)
```
  nest new mesas-ms
```

2. Entra al nuevo proyecto y crea un recurso de tipo __Microservice__ 
```
    cd name-ms
    nest g res mesas
```

3. Con esto ya puedes implementar tu microservicio, recuerda usar la carpeta __config__ del microservicio reservas para la gestion de variables de entorno
