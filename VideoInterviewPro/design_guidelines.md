# Design Guidelines: Video Interviewer Application

## Design Approach: Modern Professional Interview Platform

**Selected Approach**: Design System (Linear/Notion-inspired) with professional interview focus
**Rationale**: Utility-focused application where clarity, trust, and user confidence are paramount. Users need to feel comfortable recording themselves, so the interface must be calming, professional, and distraction-free.

**Core Design Principles**:
- **Clarity First**: Every step clearly communicated with minimal cognitive load
- **Professional Trust**: Clean, corporate-friendly aesthetic that inspires confidence
- **Progressive Disclosure**: Show only what's needed at each step
- **Calm Interface**: Muted colors and gentle transitions to reduce interview anxiety

---

## Core Design Elements

### A. Color Palette

**Light Mode**:
- Background: 0 0% 98% (off-white)
- Surface: 0 0% 100% (pure white)
- Primary: 220 90% 56% (professional blue - trustworthy)
- Text Primary: 220 20% 20% (deep charcoal)
- Text Secondary: 220 10% 45% (muted gray)
- Border: 220 15% 88% (soft gray borders)
- Success: 142 76% 36% (for recording active state)
- Accent: 220 90% 56% (matches primary)

**Dark Mode**:
- Background: 220 20% 12% (deep slate)
- Surface: 220 18% 16% (elevated slate)
- Primary: 220 90% 65% (lighter blue for contrast)
- Text Primary: 220 15% 95% (near white)
- Text Secondary: 220 10% 65% (muted light gray)
- Border: 220 15% 25% (subtle borders)
- Success: 142 70% 50% (brighter for visibility)

### B. Typography

**Font Families**:
- Primary: 'Inter' (Google Fonts) - Clean, professional, excellent readability
- Monospace: 'JetBrains Mono' (for technical elements like timers)

**Type Scale**:
- Hero/Main Title: text-4xl md:text-5xl font-semibold (form headers, question titles)
- Section Heading: text-2xl md:text-3xl font-medium
- Body Large: text-lg font-normal (instructions)
- Body: text-base font-normal (general content)
- Small: text-sm font-normal (helper text, progress indicators)
- Caption: text-xs font-medium (labels, metadata)

### C. Layout System

**Spacing Scale**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 to p-8
- Section spacing: py-12 to py-20
- Element gaps: gap-4, gap-6, gap-8

**Container Strategy**:
- Max-width: max-w-4xl for forms and video players (optimal viewing)
- Max-width: max-w-2xl for text content (readability)
- Centered layouts: mx-auto with generous px-4 to px-6

### D. Component Library

#### 1. **Interview Flow Container**
- Single-column centered layout with max-w-4xl
- Card-based design with subtle shadows (shadow-sm to shadow-md)
- Rounded corners: rounded-xl for main containers, rounded-lg for nested elements
- Progressive steps clearly numbered (Step 1 of 7 format)

#### 2. **Form Elements** (User Info Collection)
- Input fields: Large touch targets (h-12), border-2, rounded-lg
- Labels: text-sm font-medium, mb-2 spacing
- Focus states: ring-4 ring-primary/20, border-primary
- Validation: Inline error messages in text-red-600, text-sm
- Layout: Stacked with gap-6 between fields

#### 3. **Video Player Component**
- 16:9 aspect ratio container (aspect-video)
- Rounded-xl with overflow-hidden
- Custom controls bar at bottom with bg-black/80 backdrop-blur
- Play/pause, timeline, volume controls with consistent spacing
- Loading state: Subtle skeleton with pulse animation

#### 4. **Video Recording Interface**
- Preview window: Large 16:9 area showing live camera feed
- Recording indicator: Pulsing red dot with "Recording..." text
- Timer display: Monospace font, top-right of video area
- Control buttons: Large circular buttons (w-16 h-16) for Start/Stop/Retry
- Clear visual feedback for recording states (idle/recording/reviewing)

#### 5. **Progress Indicator**
- Horizontal step indicator at top of interview flow
- Completed steps: Filled circles with checkmarks
- Current step: Outlined circle with primary color
- Upcoming steps: Gray outlined circles
- Step labels below circles (Question 1, Question 2, etc.)

#### 6. **Navigation Controls**
- Primary CTA: bg-primary text-white px-8 py-3 rounded-lg font-medium
- Secondary action: border-2 border-gray-300 px-6 py-3 rounded-lg
- Disabled state: opacity-50 cursor-not-allowed
- Consistent spacing: gap-4 between action buttons

#### 7. **Admin Upload Interface**
- Drag-and-drop zone: Dashed border-2 border-dashed, rounded-xl, p-12
- File list: Each item with thumbnail preview, filename, and remove button
- Upload progress: Linear progress bar with percentage
- Question order management: Drag handles for reordering

#### 8. **Status & Feedback**
- Toast notifications: Top-right corner, slide-in animation
- Success/Error states: Icon + message + auto-dismiss (4s)
- Loading states: Spinner with "Processing..." text
- Confirmation modals: Centered overlay with backdrop-blur

### E. Animations & Transitions

**Minimal, Purposeful Motion**:
- Page transitions: Fade + subtle slide (duration-300)
- Component entry: Fade-in only (duration-200)
- Button interactions: Scale on press (scale-95)
- Recording pulse: Gentle opacity animation for recording indicator
- **No** decorative animations - focus on functional feedback

---

## Page-Specific Layouts

### Welcome/Info Collection Screen
- Centered card (max-w-2xl) with p-8
- Application title: text-4xl font-semibold mb-4
- Brief description: text-lg text-secondary mb-8
- Form fields stacked vertically with gap-6
- Large primary button at bottom: "Start Interview"

### Video Playback Screens
- Full-width video player (max-w-4xl, aspect-video)
- Title above video: text-2xl font-medium mb-4
- Instructions below: text-base text-secondary max-w-2xl
- Continue button: Bottom-right after video completes

### Recording Interface
- Split layout on desktop: Video preview (65%) + Instructions (35%)
- Mobile: Stacked with preview on top
- Large, clear recording controls centered below preview
- Question text: text-xl font-medium, always visible
- Retry option prominent after recording completion

### Progress Overview
- Horizontal stepper at page top (sticky on scroll)
- Main content area for current step
- Auto-save indicator: Subtle checkmark with "Saved" text

---

## Key UX Patterns

1. **One Task at a Time**: Each screen focuses on a single action
2. **Clear Next Steps**: Always show what happens next
3. **Forgiveness**: Easy retry/redo options without penalty
4. **Reassurance**: Confirm saves, show upload progress clearly
5. **Accessibility**: High contrast, keyboard navigation, screen reader support

---

## Images
No hero images required. This is a task-focused application where functional clarity trumps visual decoration. Video content serves as the primary visual element.