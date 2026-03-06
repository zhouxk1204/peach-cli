# Create-Peach

A lightweight and efficient frontend scaffolding tool.
Quickly create project templates for **Vue, React, and Vanilla JavaScript**, with zero configuration needed.

## ✨ Features

* Create projects in one command
* Supports **Vue / React / Vanilla** project templates
* Optional **TypeScript** support
* Simple, clean, and production-ready project structure
* Choose your preferred package manager (npm / yarn / pnpm)
* Lightweight and easy to use — no learning curve

## 🚀 Installation

```bash
npm install -g create-peach
```

or

```bash
pnpm add -g create-peach
```

## 🧭 Usage

### Create a new project

```bash
peach create my-app
```

### Framework choices

* Vue
* React
* Vanilla (pure JavaScript/TypeScript)

### Example interactive options

* JavaScript or TypeScript
* npm / yarn / pnpm
* Install dependencies automatically
* Auto-start development server

## 🛠 CLI Commands

```bash
# Show help
peach -h
peach --help

# Show version
peach -v
peach --version

# Create a new project (interactive mode)
peach create
peach create <project-name>

# Create with options
peach create my-app -f react -t typescript -s scss

# Create from remote template
peach create my-app -r <github-url>

# List all available templates
peach list

# Show CLI information and system details
peach info
```

### Create Command Options

```bash
-f, --framework <framework>   Specify framework (vue/react/vanilla)
-t, --variant <variant>       Specify variant (javascript/typescript)
-s, --style <style>          Specify style scheme (css/scss)
-r, --remote <remote>        Use remote template from GitHub
-h, --help                   Display help for command
```

## 📦 Supported templates

| Framework | Description                           |
| --------- | ------------------------------------- |
| Vue       | Vue 3 + Vite starter template         |
| React     | React + Vite starter template         |
| Vanilla   | Pure JavaScript / TypeScript template |

## 🎯 Who is it for?

* Beginners learning frontend development
* Developers who want instant project setup
* Teaching / tutorials / demo projects
* Anyone who prefers clean, minimal templates

## 🤝 Contributing

Contributions are welcome.
Feel free to open an issue or submit a pull request.

## 📄 License

MIT

---
