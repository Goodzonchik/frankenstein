# PostgresSQL Shema

```mermaid
erDiagram

    PERSON {
        string name
        string last_name
        string birth_date
    }

    PERSON ||--||  PERSON-VERSION : version
    PERSON-VERSION {
        uuid person_id
        int version
        time[without_time_zone] created
        time[without_time_zone] updated
    }

    PERSON ||--||  PERSON-GEO : geo
    PERSON-GEO {
        guid person_id
        int country_id
        int city_id
    }

    PERSON ||--||  PERSON-BIO : geo
    PERSON-BIO {
        guid person_id
        varchar(250) profession
        text interest
        text about
    }

    PERSON ||--|{  PERSON-IMAGES : geo
    PERSON-IMAGES {
        guid person_id
        varchar(250) bucket
        varchar(250) object
    }

    PERSON-GEO ||--||  CITY : geo
    CITY {
        int city_id
        varchar(250) name
        int country_id
    }

    PERSON-GEO ||--||  COUNTRY : geo
    COUNTRY {
        int country_id
        varchar(250) name
    }

CITY  ||--||  COUNTRY : geo
```

# NEO4J

```mermaid
erDiagram

    PERSON {
        uuid person_id
        int version
    }

    PERSON ||--||  CITY : location
    CITY {
        int id
        varchar(250) name
    }

    PERSON ||--||  COUNTRY : location
    COUNTRY {
        int id
        varchar(250) name
    }
```

# Идея номер 1 (V1)

Храним данные о пользователе внутри PostgreSQL
При записи добавляем +1 к версии
Также делаем синхронную реплику в only-write базу
Далее асинхронно дублируем данные уже в neo4J

Потенциальные проблемы:
Если хотим сразу же осуществить поиск по новым данным, которые еще не попали в neo4j - можно осуществить поиск в only-write инстансе PostgreSQL

# Идея номер 2 (V2)

Храним все данные пользователя внутри Neo4J, в PostgreSQL сохраняем только ту информацию, которая не связана с инфой о пользователе и не участвует в поиске, например чаты, метаинформация о файлах и т.д.

# Сравнение вариантов

1. В V2 нет дублирования информации
   1. Не требуется миграция данных, поиск доступен сразу после записи
2. Системы в V2 имеют разные БД под разные цели
3. Объем информации не будет сильно большой для БД, что не должно повлиять на нагрузку в Neo4j
4. Дополнительно можно отказаться от id в справочниках городов/стран, а напрямую использовать ноды из Neo4J
