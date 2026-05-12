# 🎨 Tailwind CSS Style Guide

## Tailwind Configuration

Our project uses **Tailwind CSS v4** with the following setup:

### Color Palette

#### Primary Colors (Blue)
```typescript
bg-blue-50      // Lightest background
bg-blue-100     // Light background
bg-blue-500     // Primary action buttons
bg-blue-600     // Darker hover state
text-blue-600   // Primary text/links
text-blue-800   // Dark text on light bg
```

#### Secondary Colors (Purple)
```typescript
bg-purple-50    // Light background
bg-purple-500   // Secondary buttons
bg-purple-600   // Hover state
text-purple-700 // Secondary text
```

#### Tertiary Colors (Pink)
```typescript
bg-pink-50      // Light background
bg-pink-500     // Tertiary buttons
bg-pink-600     // Hover state
text-pink-800   // Dark text
```

#### Neutral Colors (Gray)
```typescript
bg-gray-50      // Lighter backgrounds
bg-gray-100     // Light backgrounds
bg-gray-200     // Button backgrounds
bg-gray-300     // Borders, dividers
text-gray-600   // Body text
text-gray-700   // Stronger text
text-gray-900   // Headings
```

#### Semantic Colors
```typescript
bg-green-50 + text-green-800    // Success states
bg-red-50 + text-red-800        // Error states
bg-yellow-50 + text-yellow-800  // Warning states
bg-blue-50 + text-blue-800      // Info states
```

---

## Component Patterns

### Cards/Containers
```typescript
className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
```

**Usage:**
```tsx
<div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
  {/* Card content */}
</div>
```

**Variants:**
```typescript
// With hover effect
className="... hover:shadow-lg transition-shadow"

// With gradient top
className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white"
```

### Buttons

#### Primary Button
```typescript
className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
```

#### Secondary Button
```typescript
className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
```

#### Icon Button with Scale
```typescript
className="hover:scale-125 transition-transform"
```

### Input Fields

#### Text Input
```typescript
className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
```

#### Text Area
```typescript
className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
```

### Dropzones/Upload Areas
```typescript
className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
```

---

## Layout Patterns

### Full Width Container
```typescript
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```

### Grid Layouts

#### 2-column responsive
```typescript
className="grid grid-cols-1 md:grid-cols-2 gap-6"
```

#### 3-column responsive
```typescript
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

#### Flexible grid
```typescript
className="grid grid-cols-1 lg:grid-cols-3 gap-6"
```

### Flexbox Layouts

#### Horizontal centering
```typescript
className="flex items-center justify-center gap-4"
```

#### Vertical centering
```typescript
className="flex flex-col items-center justify-center h-96"
```

#### Space between
```typescript
className="flex items-center justify-between"
```

---

## Typography

### Headings

#### H1 (Page Title)
```typescript
className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
```

#### H2 (Section Title)
```typescript
className="text-3xl font-bold text-gray-900"
```

#### H3 (Subsection)
```typescript
className="text-2xl font-bold text-gray-900"
```

#### H4 (Component Title)
```typescript
className="text-xl font-bold text-gray-900"
```

### Body Text
```typescript
// Large body
className="text-lg text-gray-600"

// Standard body
className="text-base text-gray-700"

// Small text
className="text-sm text-gray-600"

// Extra small (captions)
className="text-xs text-gray-500"
```

### Bold/Emphasis
```typescript
className="font-semibold"    // Semi-bold
className="font-bold"         // Bold
className="font-medium"       // Medium
```

---

## Spacing

### Padding
```typescript
p-1     // 0.25rem (4px)
p-2     // 0.5rem (8px)
p-3     // 0.75rem (12px)
p-4     // 1rem (16px)
p-6     // 1.5rem (24px)
p-8     // 2rem (32px)
```

### Margins
```typescript
mb-2    // margin-bottom: 0.5rem
mb-4    // margin-bottom: 1rem
mt-6    // margin-top: 1.5rem
gap-4   // gap between flex/grid items
```

### Width
```typescript
w-full      // 100%
w-1/2       // 50%
w-1/3       // 33.33%
w-1/4       // 25%
w-screen    // Full screen width
```

### Height
```typescript
h-full      // 100%
h-screen    // Full screen height
min-h-full  // Minimum full height
```

---

## Shadows and Effects

### Shadows
```typescript
shadow-sm       // Small shadow
shadow-md       // Medium shadow (default)
shadow-lg       // Large shadow
hover:shadow-lg // Hover effect
```

### Borders

#### Border Width
```typescript
border           // 1px all sides
border-2         // 2px all sides
border-t-2       // Top only
border-b-2       // Bottom only
border-l-2       // Left only
```

#### Border Style
```typescript
border-solid    // Default
border-dashed   // Dashed line
border-dotted   // Dotted line
```

### Rounded Corners
```typescript
rounded-lg      // 0.5rem (8px)
rounded-xl      // 0.75rem (12px)
rounded-full    // 50% (circle)
```

---

## Effects & Animations

### Transitions
```typescript
// Transition all properties
transition-all duration-300

// Specific transitions
transition-colors duration-200
transition-shadow duration-300
transition-transform duration-200

// Without transition
(add 'instant' class if needed)
```

### Opacity & Visibility
```typescript
opacity-50      // 50% opacity
opacity-80      // 80% opacity
disabled:opacity-50  // When disabled

// Visibility
invisible       // Hidden but takes space
hidden          // Not visible, no space

// Display
block           // Block display
inline-block    // Inline block
flex            // Flex display
grid            // Grid display
```

### Transforms

#### Scale
```typescript
hover:scale-105     // Grow on hover
active:scale-95     // Shrink on click
group-hover:scale-125  // When parent hovered
```

#### Translate
```typescript
translate-x-1   // Move right
translate-y-1   // Move down
group-hover:translate-x-1  // Move on parent hover
```

### Gradients

#### Gradient Backgrounds
```typescript
// Horizontal
bg-gradient-to-r from-blue-500 to-purple-600

// Vertical
bg-gradient-to-b from-blue-500 to-blue-600

// Diagonal
bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600
```

#### Gradient Text
```typescript
bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
```

---

## Hover, Focus & Active States

### Button States
```typescript
// Normal
bg-blue-500

// Hover
hover:bg-blue-600 hover:shadow-lg

// Focus (keyboard)
focus:ring-2 focus:ring-blue-500 focus:outline-none

// Active (clicked)
active:scale-95

// Disabled
disabled:opacity-50 disabled:cursor-not-allowed

// Combined
"px-4 py-2 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 active:scale-95 disabled:opacity-50 transition-all"
```

### Link States
```typescript
text-blue-600 hover:text-blue-800 hover:underline
```

---

## Responsive Design Example

```typescript
// Mobile first approach
className="
  // Mobile (default)
  grid grid-cols-1 gap-4 text-center
  
  // Tablet (md: = 640px+)
  md:grid-cols-2 md:text-left
  
  // Desktop (lg: = 1024px+)
  lg:grid-cols-3 lg:gap-8
"
```

---

## Common Component Snippets

### Loading Spinner Text
```typescript
{loading ? "Loading..." : "Click Me"}
```

### Error Message
```typescript
{error && (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
    <p className="text-sm text-red-800">{error}</p>
  </div>
)}
```

### Success Message
```typescript
{success && (
  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
    <p className="text-sm text-green-800">✓ {success}</p>
  </div>
)}
```

### Badge/Tag
```typescript
<span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
  Badge
</span>
```

### Divider
```typescript
<div className="border-t border-gray-200 my-4" />
```

### Center Everything
```typescript
className="flex flex-col items-center justify-center h-96 gap-4"
```

---

## Performance Tips

### 1. Use Tailwind Utilities
✅ Good:
```typescript
className="hover:shadow-lg transition-shadow"
```

❌ Bad:
```typescript
style={{
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
}}
```

### 2. Avoid Arbitrary Values
✅ Good:
```typescript
className="text-gray-600"
```

❌ Bad:
```typescript
className="text-[#9ca3af]"
```

### 3. Use Semantic Classes
✅ Good:
```typescript
className="md:grid-cols-2"
```

❌ Bad:
```typescript
style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
```

---

## Tailwind Config Customization

If you need to add custom colors or utilities, edit `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        custom: {
          primary: '#3B82F6',
          secondary: '#A855F7',
        },
      },
      spacing: {
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
};
```

Then use in classes:
```typescript
className="bg-custom-primary text-white rounded-4xl"
```

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Color Reference](https://tailwindcss.com/docs/customizing-colors)
- [Tailwind CSS Utilities](https://tailwindcss.com/docs/utility-first)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)

---

**Last Updated:** May 2024
**Tailwind Version:** 4.0+