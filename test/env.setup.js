/*
 * This file should contain any environment variables
 * that are explicitly required in the ConfigModule
 *
 * Example:
 * process.env.SOME_REQUIRED_ENV_VAR = 'some custom value'
 *
 * By doing this, we can produce an error when launching the service
 * if the variable is not set, and avoid that error when testing it.
 */
process.env.PUB_SUB_EMULATOR_HOST = 'localhost:1234';
process.env.PUB_SUB_PROJECT_ID = 'project-id';
process.env.PUB_SUB_TOPIC = 'topic';
process.env.PUB_SUB_SUBSCRIPTION = 'subscription';
process.env.PUB_SUB_PATTERN = 'pattern';
process.env.PUB_SUB_PUSH_ENDPOINT = 'localhost:4321';
