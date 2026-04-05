export function getExecutionCredentials() {
  return {
    username: process.env.TESTSPHERE_USERNAME || '',
    password: process.env.TESTSPHERE_PASSWORD || '',
    actorEmail: process.env.TESTSPHERE_EXECUTION_USER_EMAIL || ''
  };
}
