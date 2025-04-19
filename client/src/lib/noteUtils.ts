// Get the full URL for a note with the given ID
export function getNoteUrl(id: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/n/${id}`;
}

// Count words in a text
export function countWords(text: string): number {
  if (!text) return 0;
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

// Apply formatting to the selected text
export function applyFormatting(selectedText: string, format: string): string {
  if (!selectedText && (format === 'bullet' || format === 'number')) {
    // If no text is selected for lists, add a placeholder
    return format === 'bullet' ? '- ' : '1. ';
  }
  
  if (!selectedText) {
    // For other formats, use placeholders if no text is selected
    switch (format) {
      case 'bold':
        return '**bold text**';
      case 'italic':
        return '*italic text*';
      case 'underline':
        return '_underlined text_';
      default:
        return '';
    }
  }

  // Apply formatting to the selected text
  switch (format) {
    case 'bold':
      return `**${selectedText}**`;
    case 'italic':
      return `*${selectedText}*`;
    case 'underline':
      return `_${selectedText}_`;
    case 'bullet':
      return selectedText.split('\n').map(line => `- ${line}`).join('\n');
    case 'number':
      return selectedText.split('\n').map((line, i) => `${i+1}. ${line}`).join('\n');
    default:
      return selectedText;
  }
}
