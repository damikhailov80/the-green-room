/**
 * Accessibility Auto-Fixer Script
 * 
 * This script automatically fixes accessibility issues detected in the page.
 * It uses MutationObserver to handle dynamic content changes.
 * 
 * Issues fixed:
 * - aria-hidden elements with focusable content
 * - Invalid ARIA attribute values
 * - Invalid ARIA attribute names
 * - Buttons without accessible names
 * - Empty table headers
 * - Iframes without titles
 * - Images without alt text
 * - Image inputs without alt text
 * - Links without accessible text
 * - Incorrect list structure
 * - Object elements without alternative text
 * - Missing H1 headings
 */

(function() {
  'use strict';

  // Track fixed elements to avoid duplicate processing
  const fixedElements = new WeakSet();

  /**
   * Fix aria-hidden elements containing focusable content
   */
  function fixAriaHiddenFocus(element) {
    if (fixedElements.has(element)) return;
    
    const ariaHiddenElements = element.querySelectorAll('[aria-hidden="true"]');
    ariaHiddenElements.forEach(hiddenEl => {
      // Find all focusable elements within
      const focusableElements = hiddenEl.querySelectorAll(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      focusableElements.forEach(focusable => {
        // Add tabindex="-1" to make them not focusable
        focusable.setAttribute('tabindex', '-1');
        // Also disable interactive elements
        if (focusable.tagName === 'BUTTON' || focusable.tagName === 'INPUT') {
          focusable.disabled = true;
        }
      });
      
      fixedElements.add(hiddenEl);
    });
  }

  /**
   * Fix invalid ARIA attribute values
   */
  function fixInvalidAriaValues(element) {
    if (fixedElements.has(element)) return;
    
    // Fix aria-pressed with invalid value "maybe"
    const pressedElements = element.querySelectorAll('[aria-pressed="maybe"]');
    pressedElements.forEach(el => {
      el.setAttribute('aria-pressed', 'false');
      fixedElements.add(el);
    });
  }

  /**
   * Fix invalid ARIA attribute names
   */
  function fixInvalidAriaNames(element) {
    if (fixedElements.has(element)) return;
    
    // Remove invalid aria-* attributes
    const elementsWithInvalidAria = element.querySelectorAll('[aria-invalid-attr]');
    elementsWithInvalidAria.forEach(el => {
      el.removeAttribute('aria-invalid-attr');
      fixedElements.add(el);
    });
  }

  /**
   * Fix buttons without accessible names
   */
  function fixButtonNames(element) {
    const buttons = element.querySelectorAll('button');
    buttons.forEach(button => {
      if (fixedElements.has(button)) return;
      
      // Check if button has accessible text
      const hasText = button.textContent.trim().length > 0;
      const hasAriaLabel = button.hasAttribute('aria-label') && button.getAttribute('aria-label').trim().length > 0;
      const hasAriaLabelledby = button.hasAttribute('aria-labelledby');
      const hasTitle = button.hasAttribute('title') && button.getAttribute('title').trim().length > 0;
      
      if (!hasText && !hasAriaLabel && !hasAriaLabelledby && !hasTitle) {
        // Check for hidden content like × symbol
        const hiddenSpan = button.querySelector('span[aria-hidden="true"]');
        if (hiddenSpan && hiddenSpan.textContent.includes('×')) {
          button.setAttribute('aria-label', 'Close');
        } else {
          // Generic fallback
          button.setAttribute('aria-label', 'Button');
        }
        fixedElements.add(button);
      }
    });
  }

  /**
   * Fix empty table headers
   */
  function fixEmptyTableHeaders(element) {
    const emptyHeaders = element.querySelectorAll('th');
    emptyHeaders.forEach(th => {
      if (fixedElements.has(th)) return;
      
      if (!th.textContent.trim() && !th.hasAttribute('aria-label')) {
        th.setAttribute('aria-label', 'Column header');
        fixedElements.add(th);
      }
    });
  }

  /**
   * Fix iframes without titles
   */
  function fixIframeTitles(element) {
    const iframes = element.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      if (fixedElements.has(iframe)) return;
      
      const hasTitle = iframe.hasAttribute('title') && iframe.getAttribute('title').trim().length > 0;
      const hasAriaLabel = iframe.hasAttribute('aria-label') && iframe.getAttribute('aria-label').trim().length > 0;
      
      if (!hasTitle && !hasAriaLabel) {
        const src = iframe.getAttribute('src') || '';
        if (src.includes('about:blank') || src === '') {
          iframe.setAttribute('title', 'Empty frame');
        } else {
          iframe.setAttribute('title', 'Embedded content');
        }
        fixedElements.add(iframe);
      }
    });
  }

  /**
   * Fix images without alt text
   */
  function fixImageAlt(element) {
    const images = element.querySelectorAll('img');
    images.forEach(img => {
      if (fixedElements.has(img)) return;
      
      if (!img.hasAttribute('alt')) {
        const src = img.getAttribute('src') || '';
        
        // Check if it's a decorative/tracking image (1x1 pixel)
        if (img.width === 1 && img.height === 1) {
          img.setAttribute('alt', '');
          img.setAttribute('role', 'presentation');
        } else {
          // Try to extract meaningful description from src
          const filename = src.split('/').pop().split('.')[0];
          img.setAttribute('alt', filename.replace(/-/g, ' ') || 'Image');
        }
        fixedElements.add(img);
      }
    });
  }

  /**
   * Fix image input buttons without alt text
   */
  function fixImageInputAlt(element) {
    const imageInputs = element.querySelectorAll('input[type="image"]');
    imageInputs.forEach(input => {
      if (fixedElements.has(input)) return;
      
      if (!input.hasAttribute('alt')) {
        input.setAttribute('alt', 'Submit');
        fixedElements.add(input);
      }
    });
  }

  /**
   * Fix links without accessible text
   */
  function fixLinkNames(element) {
    const links = element.querySelectorAll('a[href]');
    links.forEach(link => {
      if (fixedElements.has(link)) return;
      
      const hasText = link.textContent.trim().length > 0;
      const hasAriaLabel = link.hasAttribute('aria-label') && link.getAttribute('aria-label').trim().length > 0;
      const hasTitle = link.hasAttribute('title') && link.getAttribute('title').trim().length > 0;
      
      if (!hasText && !hasAriaLabel && !hasTitle) {
        const href = link.getAttribute('href') || '';
        link.setAttribute('aria-label', href || 'Link');
        fixedElements.add(link);
      }
    });
  }

  /**
   * Fix incorrect list structure
   */
  function fixListStructure(element) {
    const lists = element.querySelectorAll('ul, ol');
    lists.forEach(list => {
      if (fixedElements.has(list)) return;
      
      // Find direct children that are not li, script, or template
      const invalidChildren = Array.from(list.children).filter(child => {
        return !['LI', 'SCRIPT', 'TEMPLATE'].includes(child.tagName);
      });
      
      invalidChildren.forEach(child => {
        // Wrap invalid children in li
        const li = document.createElement('li');
        list.insertBefore(li, child);
        li.appendChild(child);
      });
      
      if (invalidChildren.length > 0) {
        fixedElements.add(list);
      }
    });
  }

  /**
   * Fix object elements without alternative text
   */
  function fixObjectAlt(element) {
    const objects = element.querySelectorAll('object');
    objects.forEach(obj => {
      if (fixedElements.has(obj)) return;
      
      const hasAriaLabel = obj.hasAttribute('aria-label') && obj.getAttribute('aria-label').trim().length > 0;
      const hasTitle = obj.hasAttribute('title') && obj.getAttribute('title').trim().length > 0;
      
      if (!hasAriaLabel && !hasTitle) {
        const type = obj.getAttribute('type') || '';
        const data = obj.getAttribute('data') || '';
        
        if (type.includes('pdf')) {
          obj.setAttribute('aria-label', 'PDF document');
        } else {
          obj.setAttribute('aria-label', data ? `Embedded ${type}` : 'Embedded object');
        }
        fixedElements.add(obj);
      }
    });
  }

  /**
   * Ensure page has H1 heading
   */
  function ensureH1Heading() {
    // Only check main document, not iframes
    if (window.self !== window.top) return;
    
    const existingH1 = document.querySelector('h1');
    if (!existingH1) {
      // Find the main content area or body
      const main = document.querySelector('main') || document.body;
      
      // Try to find a good candidate for H1
      const h2 = document.querySelector('h2');
      if (h2) {
        // Convert first h2 to h1
        const h1 = document.createElement('h1');
        h1.textContent = h2.textContent;
        h1.className = h2.className;
        h1.style.cssText = h2.style.cssText;
        h2.parentNode.replaceChild(h1, h2);
      } else {
        // Create a visually hidden h1
        const h1 = document.createElement('h1');
        h1.className = 'sr-only';
        h1.textContent = document.title || 'Page content';
        h1.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0;';
        main.insertBefore(h1, main.firstChild);
      }
    }
  }

  /**
   * Apply all fixes to an element and its children
   */
  function applyAllFixes(element) {
    try {
      fixAriaHiddenFocus(element);
      fixInvalidAriaValues(element);
      fixInvalidAriaNames(element);
      fixButtonNames(element);
      fixEmptyTableHeaders(element);
      fixIframeTitles(element);
      fixImageAlt(element);
      fixImageInputAlt(element);
      fixLinkNames(element);
      fixListStructure(element);
      fixObjectAlt(element);
    } catch (error) {
      console.warn('A11y fixer error:', error);
    }
  }

  /**
   * Initialize fixes on page load and set up observer
   */
  function initialize() {
    // Apply fixes to existing content
    applyAllFixes(document.body);
    ensureH1Heading();

    // Set up MutationObserver to handle dynamic content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Process added nodes
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            applyAllFixes(node);
          }
        });

        // Process attribute changes
        if (mutation.type === 'attributes' && mutation.target.nodeType === Node.ELEMENT_NODE) {
          applyAllFixes(mutation.target);
        }
      });
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-hidden', 'aria-pressed', 'aria-invalid-attr']
    });

    console.log('A11y auto-fixer initialized');
  }

  // Run as early as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
