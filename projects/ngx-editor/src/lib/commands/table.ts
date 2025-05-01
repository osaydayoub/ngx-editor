import { type EditorState, NodeSelection, type Command } from 'prosemirror-state';

import { Dispatch } from './types';

export interface ImageAttrs {
  alt?: string;
  title?: string;
  width?: string;
}

class Table {

  insert(rows: number, cols: number): Command {
    return (state: EditorState, dispatch?: Dispatch): boolean => {
      const { tr, schema, selection } = state;
      const { from, to } = selection;
  
      const message = `You inserted a table with ${rows} rows and ${cols} columns`;
      const node = schema.nodes['paragraph'].create({}, schema.text(message));
  
      tr.replaceRangeWith(from, to, node);
      tr.scrollIntoView();
  
      if (tr.docChanged) {
        dispatch?.(tr);
        return true;
      }
  
      return false;
    };
  }

  isActive(state: EditorState): boolean {
    const { selection } = state;
    if (selection instanceof NodeSelection) {
      return selection.node.type.name === 'table';
    }

    return false;
  }
}

export default Table;
