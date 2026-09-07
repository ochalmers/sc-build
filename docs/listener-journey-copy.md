# Listener journey — copy deck

**Audience:** product, design, content  
**Scope:** Listener-facing only (invitation → listening loop). Admin provisioning is out of scope.  
**Version:** 7 Sep 2026 — Clare Hindley 5 Sept amendments (US spelling, formal tone, shift-inclusive time language, no habit/gamification pressure).  
**How to edit:** Prefer Word/PPTX on Google Drive for markup. Source of truth in-repo: this Markdown + live listener UI strings.  
**Exports:** [`listener-journey-copy.docx`](./listener-journey-copy.docx) · [`listener-journey-copy.pptx`](./listener-journey-copy.pptx) · [`listener-journey-copy.pdf`](./listener-journey-copy.pdf). Re-export: `npm run export:copy-pdf` / `npm run export:copy-pptx`.

**Editorial rules (always)**
- US spelling: well-being, organization, program, personalized, recognized  
- Oxford commas  
- Avoid clock-bound phrases that alienate shift workers (e.g. “end of day”, “settle for the night”)  
- Avoid gamifying, rewarding, or pressuring habit formation  

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
| Body | Sonocea uses patented Sonic Augmentation Technology™ to create structured sound experiences designed to support regulation, recovery, and well-being. |
| Primary CTA | Get started |

### App Store
**Path:** `/app/listener/app-store`

| Element | Copy |
| --- | --- |
| App name | Sonocea |
| Tagline | Structured sound for recovery |
| Developer | Sonocea Inc. |
| Primary CTA | Get |
| Micro | In-App Purchases |
| What’s New (partner) | Access Sonocea through your organization. Short headphone sessions designed to support recovery and regulation. |
| What’s New (direct) | Personalized listening from your Sonocea invite. Short headphone sessions shaped around what you share when you join. |

### Welcome
**Path:** `/app/listener/invite`

| Element | Copy |
| --- | --- |
| Headline | Welcome to Sonocea. |
| Body (partner) | {Partner} has invited you to experience Sonocea. We’ll help you get set up, then you can start listening. |
| Body (direct) | We’ll ask a few questions to shape your experience around what matters to you. Then you can start listening. |
| Primary CTA | Let’s get started |
| Secondary | Already set up? Sign in |

### Sign in
**Path:** `/app/listener/login`

| Element | Copy |
| --- | --- |
| Title | Welcome back |
| Body (email) | Sign in with the email address linked to your invitation. |
| Body (anonymous) | Sign in with your invite code. Your name and email stay private in the app. |
| Toggle | Need to stay anonymous? ↔ Using private sign-in |
| Fields | Email address · Invite code · Password · Access password |
| Primary CTA | Continue |
| Secondary | Return to invitation |
| Error | Your invitation or sign-in details weren’t recognized. Check your details and try again. |

---

## 02 · First-time experience

**Path:** `/app/listener/onboarding?phase=…`

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
- Body: Sonocea uses structured sound to create listening experiences designed to support nervous system regulation, recovery, and well-being.  
- CTA: Next  

**2 · Purpose**  
- Title: Made for the moments that matter  
- Body: Choose sessions for what you need — from feeling calmer and more settled to preparing for focus, recovery, rest, or sleep.  
- CTA: Next  

**3 · Science**  
- Title: Built on science  
- Body: Sonocea is grounded in research into how sound and the nervous system interact. At its core is our patented Sonic Augmentation Technology™, which creates the structured sound behind every session.  
- CTA: Next  

**4 · Listening**  
- Title: Nothing to learn. Simply listen.  
- Body: You don’t need to follow instructions or get anything right. Put on your headphones, get comfortable, and let the session play.  
- Checklist: Wear headphones · Get comfortable · Give yourself the time  
- CTA: I'm ready  

### Personalize intro
| Element | Copy |
| --- | --- |
| Phrase | Now let’s shape your experience… |

### Goals
| Element | Copy |
| --- | --- |
| Title | What would you like Sonocea to support? |
| Body | Choose what matters most to you. We’ll use your answers to recommend more relevant sessions. |
| Options | Feeling calmer · Recovering and resetting · Staying focused · Feeling more balanced · Sleeping better · General well-being |
| CTA | Next |

### Moments
| Element | Copy |
| --- | --- |
| Title | When might Sonocea be useful to you? |
| Body | Think about the moments when you might want a little support. This helps us recommend sessions that fit those moments. |
| Options | When I feel overwhelmed · When I feel unsettled · When I need to reset · When I’m recovering · When I need to focus · When I’m winding down · When I want some time to myself |
| CTA | Next |

### Sensory sensitivity
| Element | Copy |
| --- | --- |
| Title | How sensitive are you to your surroundings? |
| Body | Everyone responds differently to sound, visuals, and their surroundings. This helps us tailor how the app looks and feels while you listen. |
| Options | Not particularly sensitive · Sometimes sensitive · Quite sensitive · Very sensitive · It varies |
| Primary | Next |
| Secondary | Skip |

### Listening time
| Element | Copy |
| --- | --- |
| Title | When would listening fit into your day? |
| Body | Choose any times that usually work for you. We’ll use these to make reminders more useful. |
| Options | Morning · Afternoon · Evening · Before bed · No particular time |
| CTA | Next |

### Notifications
| Element | Copy |
| --- | --- |
| Title | Would you like us to remind you? |
| Body | Get a gentle reminder around the times that usually work for you. |
| Card title | Session reminders |
| Card body | You can change your reminder settings anytime in Profile. |
| Primary | Allow notifications |
| Secondary | Not now |

### Appearance
| Element | Copy |
| --- | --- |
| Title | Choose your appearance |
| Body | Choose a look that feels right for you, or let Sonocea adjust automatically. |
| Light | Bright and clear throughout the day. |
| Dark | A softer, darker appearance. |
| Change with time of day | Light earlier in the day. Dark later on. *(badge: Recommended)* |
| Footer | You can change this anytime. |
| CTA | Next |

### Preparing
| Element | Copy |
| --- | --- |
| Title | Finding your first session, {Name} / Finding your first session… |

### Ready to listen
| Element | Copy |
| --- | --- |
| Title patterns | A session for {goal} is ready{, {Name}}. / Your first session is ready{, {Name}}. |
| Body (with goal) | Based on what you shared, we’ve selected a session for {goal}. Begin whenever you’re ready. |
| Body (no goal) | You can begin your first Sonocea session whenever you’re ready. |
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
| Empty | No sessions in this category yet. |

---

## 04 · Program / Library

### Program
**Path:** `/app/listener/programme`

| Element | Copy |
| --- | --- |
| Title | Your program / Your sessions *(direct)* |
| Tabs | List · Calendar |
| About Sonocea | Sonocea uses patented Sonic Augmentation Technology™ to create structured sound experiences designed to support nervous system regulation, recovery, and well-being. |
| Program fallback | Your organization has shared a set of listening sessions to support recovery and well-being. |
| Direct body | Session suggestions reflect the goals and moments you shared when you joined. You can listen in any order that works for you. |

### Saved (stub)
**Path:** `/app/listener/favorites`

| Element | Copy |
| --- | --- |
| Title | Saved |
| Body | Saved sessions are coming soon. |
| Card | Coming later — You’ll be able to save sessions here for easy access. |
| CTA | Browse your sessions |

### Partner program titles (listener-visible)

| Organisation | Title | Body |
| --- | --- | --- |
| Haven | Gentle Recovery | Gentle recovery sessions for times when things feel like a lot, with a calm and supportive approach. |
| Summit | Between-Block Reset | Short reset sessions for recovery between busy or demanding periods. |
| Wigan | Matchday Recovery | Listening sessions to support academy and first-team recovery around the match week. |
| Loughborough | Campus Calm | Short listening sessions for student-athletes between training and study. |
| Preston North End | Post-Training Recovery | Short headphone sessions for academy and first-team players after training, between fixtures, and on rest days. |
| Direct | Your personalized program | A listening program shaped around your goals and the moments when you might want support. |

---

## 05 · Session journey

### Session drawer
| Element | Copy |
| --- | --- |
| Section | Before you begin |
| Default prep | Find a comfortable place and use headphones · There’s nothing to follow · Simply listen |
| Primary | Start session / Resume session |

### Session catalogue (shift-inclusive)

| Session | Headline | Description | Before you begin |
| --- | --- | --- | --- |
| Session 1 | Ease into what’s ahead. | For when you’re getting started and want a gentle way to settle before moving into what’s next. | Use headphones · Get comfortable · Give yourself a few uninterrupted minutes |
| Session 2 | Find a quieter moment. | For moments when things feel busy and you’d like some space before carrying on. | Use headphones · Find somewhere comfortable · Give yourself a few uninterrupted minutes |
| Session 3 | Find a little more space to focus. | For when you want to settle in before concentrating on what’s ahead. | Use headphones · Sit comfortably · Best before focused activity |
| Session 4 | Clear a little space to think. | For when you’d like to gather yourself before moving on to the next thing. | Use headphones · Sit or lie comfortably · Best when you have some quiet time |
| Session 5 | Give yourself a moment to reset. | For when you’ve finished something demanding and want some time to recover. | Use headphones · Get comfortable · Best between demanding activities |
| Session 6 | Leave what’s been behind. | For when you’ve finished something demanding and want to take some time for yourself. | Use headphones · Get comfortable · Best when you have some uninterrupted time |
| Session 7 | Give yourself time to settle. | For when you’re ready to unwind, recover, and prepare for rest. | Use headphones · Get comfortable · Best when you’re ready to rest |
| Session 8 | Move gently from one thing to the next. | For when you want a little space between what’s been and what’s next. | Use headphones · Find somewhere comfortable · Best at a natural pause |
| Session 9 | Make a little room for yourself. | For when you’d like some quiet space alongside other support in your day. | Use headphones · Sit or lie comfortably · Best when you have some quiet time |
| Session 10 | Settle before sleep. | For when you’re ready to sleep and want a little time to settle first. | Use headphones · Get comfortable · Best when you’re preparing to sleep |

### Before check-in
| Element | Copy |
| --- | --- |
| Title | Before you begin, tell us how you’re feeling |
| Body | Choose what feels closest. We’ll ask you again after the session so you can compare how you feel. |
| Primary | Continue |
| Secondary | Skip |

---

## 06 · Playback

| State | Copy |
| --- | --- |
| Begin bridge | Your session is about to begin. |
| Paused | Paused |
| First complete | Your first session is complete. |
| Later complete | Your session is complete. |
| Unavailable | Session unavailable |

---

## 07 · Reflection & completion

| Element | Copy |
| --- | --- |
| Title | How do you feel now? |
| Body | Choose what feels closest. There’s no right answer. This simply records how you feel after listening. |
| Primary | Continue |
| Secondary | Skip |
| Exit bridge | See you next time{, {Name}}. |

---

## 08 · Progress (listening)

| Element | Copy |
| --- | --- |
| Title | Your listening |
| Body | A look at your listening and what you’ve shared. |
| Stats | Sessions · This week · Program |
| Goals | What you’d like to support. — From what you shared when you joined. |
| Felt | How you felt — Your before and after check-ins from completed sessions. |
| Felt empty | Complete a before and after check-in to see your responses here. |
| History empty | Sessions you complete will appear here. |

---

## 09 · Organization / plan

### Partner organization
| Element | Copy |
| --- | --- |
| Title | {Partner} / Your organization |
| Fallback body | Your organization has shared a set of listening sessions to support you. |
| About | {N} sessions chosen for you as part of your organization’s plan. |
| What it’s for | Help you settle and recover. *(PNE: For listening after training, between fixtures, and on rest days, when you want time to settle and recover.)* |
| Need help? | For program questions, ask your organization. For app issues, use Support. |
| CTA | Contact support |

### Direct-access plan
| Element | Copy |
| --- | --- |
| Title | Your listening plan |
| Body | Sonocea shaped this set around the goals, moments, and listening times you shared when you joined. |
| Need help? | For app or playback issues, use Support. There’s no organization contact on this plan. |

---

## 10 · Profile & about

| Element | Copy |
| --- | --- |
| Appearance | Light · Dark · Change with time of day |
| Links | Organization · About Sonocea · Support · Sign out |
| About body | Sonocea uses patented Sonic Augmentation Technology™ to create the structured sound behind its listening experiences. These experiences are designed to support regulation, recovery, and well-being. |

---

## 11 · Support

| Element | Copy |
| --- | --- |
| Title | Need help? |
| Body | For access or program questions, contact your organization. For playback or account issues, contact Sonocea using the support details in your invitation. |
| CTA | Back to profile |

---

## 12 · System / edge states

US spelling throughout (`program`, `organization`, `recognized`). Secondary on most error states: **Contact support**.

---

## Notes for editors

1. Prefer this document for copy review; keep Admin copy separate.  
2. `{…}` placeholders are dynamic.  
3. Partner program titles/bodies are organization CMS fields.  
4. Progress/gamification language remains under discussion with Clare — this build softens streak/habit pressure.  
5. Dated app build: `/v/2026-09-07/`.
