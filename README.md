# react-native-trpc-test-example

This is an example of a heavily coupled API / React native application with TRPC and RTK Query

The react native application lives under src/app
The API lives under src/server

This example just has a simple TODO list end point with input types and return types being shared through TRPC.

### To run:

Install deps:
`yarn`

Pods:
`gem install bundler && cd ios && bundle exec pod install && cd ..`

Run metro and server:
`yarn start`

Just Metro:
`yarn start:app`

Just API:
`yarn start:server`

iOS:
`yarn ios`

Android:
`yarn android`
