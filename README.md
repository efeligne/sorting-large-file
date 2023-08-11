# Сортировка большого файла

## Запуск

```shell
npm install && npm run start
```

Получившийся результат после старта или команды `npm run build` см. в директрии `build`.

## Запуск в режиме разработки

```shell
npm install && npm run dev
```

## Изменение конфигурации

Некоторые параметры кофигурации доступны для изменения в файле `src/data/config.json`

## Эмуляция теста на слабой машине

Хост-машина в моем случае Macbook с чипом M1. Поэтому конфигурация Vagrantfile и дальнейшие инструкции специфичны для Mac OS и архитектуры ARM64. Для других архитектур и хостовых операционных систем может потребоваться модификация Vagrantfile и использование других средств виртуализации.

Для тестирования на машине с ОЗУ 512Мб использовался Vagrant в связке с Paralles Desktop. Для запуска машины без изменения Vagrantfile нужна установка [Parallels Desktop Pro Edition](https://www.parallels.com/products/desktop/pro/), [Vagrant](https://developer.hashicorp.com/vagrant/downloads?product_intent=vagrant) и плагина [vagrant-parallels](http://parallels.github.io/vagrant-parallels/docs/installation/).

Для установки Vagrant можно воспользоваться [Homebrew](https://brew.sh/):

```shell
brew install hashicorp/tap/hashicorp-vagrant
```

Для установки плагина vagrant-parallels:

```shell
vagrant plugin install vagrant-parallels
```

Parallels Desktop Pro Edition платный продукт, но доступен тестовый период.

Для запуска виртуальной машины нужно перейти в папку с проектом и ввести:

```shell
vagrant up
```

После завершения загрузки, установки и запуска виртуальной машины можно подключиться к ней по ssh:

```shell
vagrant ssh
```

Подробнее о работе с Vagrant можно узнать в [документации](https://developer.hashicorp.com/vagrant/docs).
