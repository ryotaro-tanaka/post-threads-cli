# Threads Post CLI

This project is a simple CLI tool for publishing posts to Threads using the Threads API from the command line. It uses the token configured in the `.env` file to publish messages.

## Usage

You can post to Threads by running the following command:

```bash
npm run threads "Your message here"
```

## Setup

1.  Copy `.sample.env` to create a `.env` file.
2.  Set the long-lived access token obtained from Meta for Developers to `THREADS_LONG_LIVED_TOKEN`.

```env
THREADS_LONG_LIVED_TOKEN=your_long_lived_token
```

## 1. How to obtain a LONG_LIVED_TOKEN

Obtain the token from the Meta for Developers dashboard.

1.  Open your existing Threads app in [Meta for Developers](https://developers.facebook.com/).
2.  Click **Go Live** in the left navigation menu.
3.  Under **App Use Cases**, find **Threads API** and click **Details** or **Settings**.
4.  Navigate to the **Settings** tab (if not already there).
5.  Scroll down to the **User Token Generator** section.
6.  Click **Generate Token** for the Threads account you want to use (must be added as a tester).
7.  Copy the generated token and save it as `THREADS_LONG_LIVED_TOKEN` in your `.env` file.

## Internal Mechanism

Running `npm run threads` executes the following three API steps internally:

1.  **Get User ID**: Uses the `LONG_LIVED_TOKEN` to retrieve the user ID of the account.
2.  **Create Post Container**: Creates a media container (draft state) with the specified text.
3.  **Publish Post**: Publishes the created container ID to Threads.

---

## Manual Execution (for Debugging)

If you want to verify API behavior manually, use the following `curl` commands:

### 1. Verify User ID
```bash
curl -s "https://graph.threads.net/v1.0/me?fields=id,username&access_token=YOUR_LONG_LIVED_TOKEN"
```

### 2. Create Post Container
```bash
curl -X POST "https://graph.threads.net/v1.0/THREADS_USER_ID/threads" \
  -F media_type=TEXT \
  -F text='test post from curl' \
  -F access_token=YOUR_LONG_LIVED_TOKEN
```

### 3. Publish the Post
```bash
curl -X POST "https://graph.threads.net/v1.0/THREADS_USER_ID/threads_publish" \
  -F creation_id=CREATION_ID \
  -F access_token=YOUR_LONG_LIVED_TOKEN
```
