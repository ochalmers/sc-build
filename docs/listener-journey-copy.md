# Listener journey — copy deck

**Audience:** product, design, content  
**Scope:** Listener-facing only (invitation → listening loop). Admin provisioning is out of scope.  
**How to edit:** Change the strings in this file. The live app still holds its own UI strings — treat this as the review / handoff source until we wire screens to a shared copy module.  
**PDF:** [`docs/listener-journey-copy.pdf`](./listener-journey-copy.pdf) (also downloadable from [/listener-journey-copy.pdf](/listener-journey-copy.pdf)). Re-export after edits: `npm run export:copy-pdf`.

Dynamic bits are shown as `{Name}`, `{Partner}`, `{N}`, etc.

---

## 01 · Invitation & authentication

### Invitation email
**Path:** `/app/listener/email`

| Element | Copy |
| --- | --- |
| Eyebrow | Invitation |
| Subject / title | You’re invited to Sonocea |
| Meta | From {Partner\|Sonocea} · Today |
| Headline (partner) | {Partner} has invited you to experience Sonocea. |
| Headline (direct) | You’re invited to experience Sonocea. |
| Body | Sonocea uses patented Sonic Augmentation Technology™ to create structured listening experiences designed to support regulation, recovery and wellbeing. |
| Primary CTA | Get started |

**Partner invite line examples**

- Haven Care Network has invited you to experience Sonocea.
- Summit Performance Lab has invited you to experience Sonocea.
- Wigan Athletic has invited you to experience Sonocea.
- Loughborough Sport has invited you to experience Sonocea.
- Preston North End has invited you to experience Sonocea.
- You’re invited to experience Sonocea. *(direct / anonymous)*

### App Store
**Path:** `/app/listener/app-store`

| Element | Copy |
| --- | --- |
| App name | Sonocea |
| Tagline | Guided listening for recovery |
| Developer | Sonocea Ltd |
| Primary CTA | Get |
| Micro | In-App Purchases |
| What’s New (partner) | Join partner-led listening programmes. Short headphone sessions for recovery and regulation - invited by your organisation. |
| What’s New (direct) | Personalised listening from a Sonocea invite. Short headphone sessions shaped around what you share when you join. |

### Welcome
**Path:** `/app/listener/invite`

| Element | Copy |
| --- | --- |
| Headline | Welcome to Sonocea. |
| Body (partner) | {Partner} has invited you to experience Sonocea. We’ll help you get set up, then you can start listening. |
| Body (direct) | We’ll ask a few questions so your home and sessions match what you need, then you can start listening. |
| Primary CTA | Let’s get started |
| Secondary | Already set up? Sign in |

### Sign in
**Path:** `/app/listener/login`

| Element | Copy |
| --- | --- |
| Title | Welcome back |
| Body (email) | Sign in with the email from your organisation. |
| Body (anonymous) | Sign in with your invite code - your name and email stay private in the app. |
| Toggle | Need to stay anonymous? ↔ Using private sign-in |
| Fields | Email · Invite code · Password · Access password |
| Primary CTA | Continue |
| Secondary | Open invitation instead |
| Error | Invite or credentials not recognised. Try the demo account. |

---

## 02 · First-time experience

**Path:** `/app/listener/onboarding?phase=…`

### Loading
| Element | Copy |
| --- | --- |
| Micro | Loading |

### Preferred name
| Element | Copy |
| --- | --- |
| Title | What should we call you? |
| Body | We’ll use this when we say hello. A first name or nickname is perfect. |
| Placeholder | Your name |
| Primary CTA | Continue |

### Welcome bridge
| Element | Copy |
| --- | --- |
| Phrases | Hi, {Name}. / Hi. → A little about us… |

### About Sonocea (4 slides)

**1 · Experience**  
- Title: Listening, designed differently  
- Body: Sonocea uses structured sound to create listening experiences designed around how your nervous system responds to what you hear.  
- CTA: Next  

**2 · Purpose**  
- Title: Made for the moments that matter  
- Body: Choose sessions based on what you need, from feeling calmer and more settled to supporting focus, recovery, rest or preparation for sleep.  
- CTA: Next  

**3 · Science**  
- Title: Built on science  
- Body: Sonocea is grounded in research into how sound and the nervous system interact. Our Sonic Augmentation Technology™ uses structured sound to create listening experiences for specific states and outcomes.  
- CTA: Next  

**4 · Listening**  
- Title: Nothing to learn. Just listen.  
- Body: You don’t need to follow instructions or get anything right. Put on your headphones, get comfortable and give the session your attention.  
- Checklist:  
  - Wear headphones — Use both ears and choose a comfortable volume.  
  - Get comfortable — Sit or lie somewhere you can relax.  
  - Give yourself the time — Try to listen without interruption until the session ends.  
- CTA: I'm ready  

### Personalise intro
| Element | Copy |
| --- | --- |
| Phrase | Now let’s learn more about you… |

### Goals
| Element | Copy |
| --- | --- |
| Title | What would you like Sonocea to help with? |
| Body | This helps us understand what matters to you and recommend sessions that feel more relevant. |
| Options | Feeling calmer · Recovering and resetting · Staying focused · Feeling more balanced · Sleeping better · General wellbeing |
| CTA | Next |

### Moments
| Element | Copy |
| --- | --- |
| Title | When might Sonocea be useful to you? |
| Body | Think about the moments when you might want a little support. This helps us understand when different sessions could be most useful. |
| Options | When I feel overwhelmed · When I feel unsettled · When I need to reset · When I’m recovering · When I need to focus · When I’m winding down · When I want some time to myself |
| CTA | Next |

### Sensory sensitivity
| Element | Copy |
| --- | --- |
| Title | How sensitive are you to your surroundings? |
| Body | Everyone responds differently to sound, visuals and their surroundings. This helps us tailor how your sessions look and feel. |
| Options | Not particularly sensitive · Sometimes sensitive · Quite sensitive · Very sensitive · It varies |
| Primary | Next |
| Secondary | Skip |

### Listening time
| Element | Copy |
| --- | --- |
| Title | When would listening fit into your day? |
| Body | Choose the times that feel most natural for you. We’ll use this to make your experience and reminders more useful. |
| Options | Morning · Afternoon · Evening · Before bed · No particular time |
| CTA | Next |

### Notifications
| Element | Copy |
| --- | --- |
| Title | Would you like us to remind you? |
| Body | We can send gentle reminders around the times you’ve chosen, so it’s easier to make time for your sessions. |
| Card title | Session reminders |
| Card body | Helpful prompts around the times that work for you. You can change these anytime in Profile. |
| Primary | Allow notifications |
| Secondary | Not now |

### Appearance
| Element | Copy |
| --- | --- |
| Title | How would you like Sonocea to feel? |
| Body | Choose an appearance that feels right for you, or let Sonocea adapt throughout the day. |
| Light | Bright and clear throughout the day. |
| Dark | A softer, darker listening environment. |
| Adapt | Light during the day. Dark when it gets later. *(badge: Recommended)* |
| Adapt micro | It's {daytime\|evening} where you are, so Sonocea will begin in {Light\|Dark}. |
| Footer | You can change this anytime. |
| CTA | Next |

### Preparing
| Element | Copy |
| --- | --- |
| Title | Preparing your first session, {Name} / Preparing your first session… |

### Ready to listen
| Element | Copy |
| --- | --- |
| Title patterns | {A morning session \| An afternoon session \| An evening session \| A wind-down session \| Your first session} is ready{, {Name}}. |
| Body (with goal) | Matched to {goal}, for the times you said you’d listen. Begin when you’re ready. |
| Body (no goal) | Everything is set. If you’re comfortable, you can begin your first Sonocea session now. |
| Session meta | {N} min |
| Primary | Begin |
| Secondary | Not right now |

---

## 03 · Home

**Path:** `/app/listener/home`

| Element | Copy |
| --- | --- |
| Greeting | Good morning{, {Name}} / Good afternoon{, {Name}} / Good evening{, {Name}} |
| Mode pills (default) | Rest · Focus · Restore |
| Hero meta (next) | {duration} |
| Hero meta (resume) | Resume · {N}% listened |
| List section | More {Rest\|Focus\|Restore} |
| Row meta | {duration} · {useCase}{ · Done} |
| Empty | No sessions in this mode yet. |

---

## 04 · Programme / Library

### Programme
**Path:** `/app/listener/programme`

| Element | Copy |
| --- | --- |
| Title | Your programme / Your sessions *(direct)* |
| Tabs | List · Calendar |
| About Sonocea | Sonocea uses patented Sonic Augmentation Technology™ to deliver structured listening experiences designed to support nervous system regulation, recovery and wellbeing. |
| Programme fallback | Your organisation has shared a set of listening sessions to support recovery and wellbeing. |
| Direct body | Session order and suggestions follow the goals, moments, and times you shared in onboarding. You can listen in any order that fits. |

### Library
**Path:** `/app/listener/library`

| Element | Copy |
| --- | --- |
| Title | Library |
| Body | All sessions from {Partner} / All sessions in your programme |
| Empty | No sessions in {mode} yet. |

### Saved (stub)
**Path:** `/app/listener/favorites`

| Element | Copy |
| --- | --- |
| Title | Saved |
| Body | Favorites aren’t in this build yet - they’ll land in a later version. |
| Card | Coming later — You’ll be able to save sessions from your list and find them here quickly. |
| CTA | Browse your sessions |

### Partner programme titles (listener-visible)

| Organisation | Title | Body |
| --- | --- | --- |
| Haven | Gentle Recovery | Gentle recovery sessions for when things feel a lot - paced and supportive. |
| Summit | Between-Block Reset | Short reset sessions for recovery between busy or demanding days. |
| Wigan | Matchday Recovery | Listening sessions for academy and first-team recovery around the match week. |
| Loughborough | Campus Calm | Short regulation sessions for student-athletes between training and study. |
| Preston North End | Post-Training Recovery | Preston North End has shared a curated Post-Training Recovery programme — short headphone sessions for academy and first-team players after training, between fixtures, and on rest days. |
| Direct | Your personalised programme | A listening programme shaped around what you share in onboarding — goals, moments, and when you listen. |

---

## 05 · Session journey

### Session drawer
| Element | Copy |
| --- | --- |
| Meta | {duration} · {mode\|useCase} |
| Title | {Rest\|Focus\|Restore} Session {N} |
| Section | Before you begin |
| Default prep | Use headphones · Get comfortable · Give yourself a few uninterrupted minutes |
| Primary | Start session / Resume session |

### Session catalogue

| Session | Headline | Description | Before you begin |
| --- | --- | --- | --- |
| Session 1 | Ease into the start of your day. | For when you’re arriving and want a gentle way to settle before things get going. | Use headphones · Get comfortable · Best at the start of your day |
| Session 2 | Find a quieter moment. | For moments when things feel busy and you’d like some space before carrying on. | Use headphones · Find somewhere comfortable · Give yourself a few uninterrupted minutes |
| Session 3 | Find a little more space to focus. | For when you want to settle in before concentrating on what’s ahead. | Use headphones · Sit comfortably · Best before focused activity |
| Session 4 | Clear a little space to think. | For mid-morning moments when you’d like to gather yourself before the next thing. | Use headphones · Sit or lie comfortably · Best when you have some quiet time |
| Session 5 | Give yourself a moment to reset. | For when you’ve finished something demanding and want some time to recover. | Use headphones · Get comfortable · Best between demanding blocks |
| Session 6 | Leave the day behind. | For moments when you want to slow things down and take some time for yourself. | Use headphones · Get comfortable · Best later in the day |
| Session 7 | Settle into a slower pace. | For when you’re ready to switch off, recover and prepare for rest. | Use headphones · Get comfortable · Best later in the day |
| Session 8 | Move gently from one thing to the next. | For when you’re changing pace and want a clean moment between what’s been and what’s next. | Use headphones · Find somewhere comfortable · Best at a natural pause |
| Session 9 | Make a little room for yourself. | For when you’d like some quiet space alongside other support in your day. | Use headphones · Sit or lie comfortably · Best when you have some quiet time |
| Session 10 | Close the day gently. | For a short moment before bed when you’re ready to settle for the night. | Use headphones · Get comfortable · Best later in the day |

### Before check-in
| Element | Copy |
| --- | --- |
| Title | Before you begin, tell us how you’re feeling |
| Body | Choose what feels closest. We’ll ask you again after the session so you can notice if anything has changed. |
| Slider idle | Slide to check in |
| Ends | Unsettled · Settled |
| Labels 1–5 | Unsettled · A little unsettled · Neutral · Settled · Very settled |
| Note | Add note / Anything you’d like to note? (Optional) |
| Placeholder | A few words is enough… |
| Primary | Continue |
| Secondary | Skip |

---

## 06 · Playback

**Path:** `/app/listener/player/:sessionId`

| State | Copy |
| --- | --- |
| Begin bridge | Your session is about to begin. |
| Paused | Paused |
| First complete | Well done. → You've completed your first session. |
| Later complete | Well done. → Your session is complete. |
| Unavailable | Session unavailable |

---

## 07 · Reflection & completion

**Path:** `/app/listener/feedback/:sessionId`

| Element | Copy |
| --- | --- |
| Title | How do you feel now? |
| Body | Choose what feels closest. There’s no right answer. This simply helps you notice how you feel after listening. |
| Controls | Same feel scale + optional note as before check-in |
| Primary | Continue |
| Secondary | Skip |
| Exit bridge | See you at your next session{, {Name}}. |

---

## 08 · Progress

**Path:** `/app/listener/progress`

| Element | Copy |
| --- | --- |
| Title | Your progress |
| Body | How listening is settling into your week |
| Stats | Streak · This week · Programme |
| Streak empty | Start a streak by finishing a session today |
| Streak 1 | 1 day in a row - keep going when it feels right |
| Streak n | {n} days in a row |
| Goals | Your goals — From what you said listening should support. |
| Felt | How you felt — Before and after ratings from your sessions. |
| Felt empty | After you check in before and after a session, the shift will show here. |
| History | Listening history |
| History empty | Finish a session and it’ll show up here. |

---

## 09 · Organisation / plan

**Path:** `/app/listener/organisation`

### Partner organisation
| Element | Copy |
| --- | --- |
| Title | {Partner} / Your organisation |
| Fallback body | Your organisation has shared a set of listening sessions to support you. |
| About | {N} sessions chosen for you as part of your organisation’s plan. |
| What it’s for | Help you settle, recover, and build a steadier listening habit. |
| Need help? | For programme questions, ask your organisation. For app issues, use Support. |
| CTA | Contact support |

### Direct-access plan
| Element | Copy |
| --- | --- |
| Title | Your listening plan |
| Body | Sonocea shaped this set from what you shared — not from an organisation programme. |
| Need help? | For app or playback issues, use Support. There’s no organisation contact on this plan. |

---

## 10 · Profile & about

### Profile
**Path:** `/app/listener/profile`

| Element | Copy |
| --- | --- |
| Title | {Name} / You |
| Subtitle | {email} / Private account |
| Appearance | Light · Dark · Adapt to time of day |
| Links | Organisation · About Sonocea · Support · Sign out |

### About Sonocea
**Path:** `/app/listener/about`

| Element | Copy |
| --- | --- |
| Title | Sonocea |
| Body 1 | Sonocea offers listening sessions designed to help you settle, focus, and recover. Access is by invitation from your organisation. |
| Body 2 | Sessions stream securely in the app and can’t be downloaded or shared. |

---

## 11 · Support

**Path:** `/app/listener/support`

| Element | Copy |
| --- | --- |
| Title | Need help? |
| Body | For access or programme questions, contact your organisation. For playback or account issues, reach Sonocea using the email on your invitation. |
| Demo note | Demo note: this is a working product shell - support messages aren’t sent. |
| CTA | Back to profile |

---

## 12 · System / edge states

**Path:** `/app/listener/system-states`

| State | Title | Message | Primary |
| --- | --- | --- | --- |
| loading | Loading your sessions… | Fetching your assigned programme. | — |
| offline | No connection | Check your network and try again. | Retry |
| no-sessions | No sessions assigned | Your provider hasn't assigned any sessions yet. Check back later or contact them. | Contact organisation |
| session-unavailable | Session unavailable | This session couldn't load. Try again or contact support. | Try again |
| playback-error | Playback error | Something went wrong during playback. Please try again. | Try again |
| playback-interrupted | Playback interrupted | Listening paused when you left the app. Tap to resume. | Resume |
| invalid-invitation | Invalid invitation | This invite code isn't recognised. Check with your provider. | Enter new code |
| expired-invitation | Invitation expired | This invite has expired. Request a new one from your administrator. | Request new invite |
| access-revoked | Access revoked | Your access has been removed. Contact your organisation for help. | Contact support |
| server-error | Server error | Something went wrong on our end. Please try again shortly. | Try again |
| maintenance | Under maintenance | Sonocea is temporarily unavailable while we perform updates. | Check status |

Secondary on most error states: **Contact support**

---

## Notes for editors

1. Prefer this document for copy review and mark-up; keep Admin copy separate.  
2. `{…}` placeholders are dynamic — don’t hard-code demo names in final copy.  
3. Partner programme titles/bodies are organisation CMS fields; defaults above are the seeded examples.  
4. No dedicated listener SMS template exists yet — invite SMS reuses channel selection on Admin only.  
5. To export a PDF: open `/copy` in the prototype → browser Print → Save as PDF.
