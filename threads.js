require('dotenv').config();

async function postToThreads() {
  const token = process.env.THREADS_LONG_LIVED_TOKEN;
  const text = process.argv[2];

  if (!token) {
    console.error('Error: THREADS_LONG_LIVED_TOKEN is not set in .env');
    process.exit(1);
  }

  if (!text) {
    console.error('Error: Please provide a message to post.');
    console.error('Usage: npm run threads "your message"');
    process.exit(1);
  }

  try {
    // 1. Get User ID
    console.log('Fetching user ID...');
    const meRes = await fetch(`https://graph.threads.net/v1.0/me?fields=id&access_token=${token}`);
    const meData = await meRes.json();
    if (!meRes.ok) throw new Error(`Failed to get user ID: ${JSON.stringify(meData)}`);
    const userId = meData.id;

    // 2. Create Post Container
    console.log('Creating post container...');
    const containerRes = await fetch(`https://graph.threads.net/v1.0/${userId}/threads`, {
      method: 'POST',
      body: new URLSearchParams({
        media_type: 'TEXT',
        text: text,
        access_token: token
      })
    });
    const containerData = await containerRes.json();
    if (!containerRes.ok) throw new Error(`Failed to create container: ${JSON.stringify(containerData)}`);
    const creationId = containerData.id;

    // 3. Publish Post
    console.log('Publishing post...');
    const publishRes = await fetch(`https://graph.threads.net/v1.0/${userId}/threads_publish`, {
      method: 'POST',
      body: new URLSearchParams({
        creation_id: creationId,
        access_token: token
      })
    });
    const publishData = await publishRes.json();
    if (!publishRes.ok) throw new Error(`Failed to publish: ${JSON.stringify(publishData)}`);

    console.log('Successfully posted to Threads!');
    console.log('Post ID:', publishData.id);

  } catch (error) {
    console.error('Error occurred:', error.message);
    process.exit(1);
  }
}

postToThreads();
