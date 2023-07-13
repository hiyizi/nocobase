import { useFieldSchema } from '@formily/react';
import {
  css,
  cx,
  DndContext,
  SchemaComponent,
  SchemaInitializer,
  SortableItem,
  useDesignable,
  useDesigner,
} from '@nocobase/client';
import { List } from 'antd-mobile';
import React from 'react';
import { useTranslation } from '../../../../locale';
import { PageSchema } from '../../common';
import { MenuDesigner } from './Menu.Designer';
import { MenuItem } from './Menu.Item';
import { menuItemSchema } from './schema';

const InternalMenu: React.FC = (props) => {
  const Designer = useDesigner();
  const fieldSchema = useFieldSchema();
  const { insertBeforeEnd, designable } = useDesignable();

  const { t } = useTranslation();

  const onAddMenuItem = (values: any) => {
    const properties = {
      page: PageSchema,
    };

    return insertBeforeEnd({
      type: 'void',
      title: values.name,
      'x-component': 'MMenu.Item',
      'x-component-props': values,
      'x-designer': 'MMenu.Item.Designer',
      properties,
    });
  };

  return (
    <SortableItem
      className={cx(
        'nb-mobile-menu',
        css`
          background: #ffffff;
          width: 100%;
          margin-bottom: var(--nb-spacing);
        `,
      )}
    >
      <List>
        {designable && (
          <List.Item>
            <Designer />
          </List.Item>
        )}
        <DndContext>
          <SchemaComponent onlyRenderProperties schema={fieldSchema}></SchemaComponent>
        </DndContext>
        {designable ? (
          <List.Item>
            <SchemaInitializer.ActionModal
              buttonText={t('Add menu item')}
              title={t('Add menu item')}
              schema={menuItemSchema}
              onSubmit={onAddMenuItem}
            />
          </List.Item>
        ) : null}
      </List>
    </SortableItem>
  );
};

export const MMenu = InternalMenu as unknown as typeof InternalMenu & {
  Item: typeof MenuItem;
  Designer: typeof MenuDesigner;
};

MMenu.Item = MenuItem;
MMenu.Designer = MenuDesigner;