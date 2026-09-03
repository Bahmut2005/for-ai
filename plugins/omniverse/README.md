# The Omniverse Wheel plugin

Adds the `omniverse-wheel` skill, which spins [The Omniverse Wheel](https://github.com/bahmut2005/for-ai)
and prints a random media recommendation.

## Install

```shell
/plugin marketplace add bahmut2005/for-ai
/plugin install omniverse@omniverse-plugins
```

## Use

```shell
/omniverse:omniverse-wheel
/omniverse:omniverse-wheel anime
/omniverse:omniverse-wheel horror movies
/omniverse:omniverse-wheel 90s
```

## Requirements

The skill talks to a running Omniverse Wheel instance over HTTP. It uses
`$OMNIVERSE_WHEEL_URL` when set, and `http://localhost:3000` otherwise.

- **Running from an Omniverse Wheel checkout:** nothing to configure. If nothing is listening on
  `localhost:3000`, the skill starts `npm run dev` for you and waits for it.
- **Running anywhere else:** point `OMNIVERSE_WHEEL_URL` at an instance you can reach, for example
  `export OMNIVERSE_WHEEL_URL=https://omniverse.example.com`. Outside a checkout the skill never
  tries to start a server; it reports that the instance is unreachable instead.

The instance needs a seeded database (`npm run db:seed`), or spins return
`No titles match...`.
