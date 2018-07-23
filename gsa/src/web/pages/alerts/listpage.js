/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2017 - 2018 Greenbone Networks GmbH
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
import React from 'react';

import _ from 'gmp/locale';

import {ALERTS_FILTER_FILTER} from 'gmp/models/filter';

import IconDivider from '../../components/layout/icondivider.js';
import PropTypes from '../../utils/proptypes.js';
import withCapabilities from '../../utils/withCapabilities.js';

import EntitiesPage from '../../entities/page.js';
import withEntitiesContainer from '../../entities/withEntitiesContainer.js';

import ManualIcon from '../../components/icon/manualicon.js';
import NewIcon from '../../components/icon/newicon.js';

import {createFilterDialog} from '../../components/powerfilter/dialog.js';

import AlertComponent from './component.js';
import AlertTable, {SORT_FIELDS} from './table.js';

const ToolBarIcons = withCapabilities(({
  capabilities,
  onAlertCreateClick,
}) => (
  <IconDivider>
    <ManualIcon
      page="vulnerabilitymanagement"
      anchor="alerts"
      title={_('Help: Alerts')}
    />
    {capabilities.mayCreate('alert') &&
      <NewIcon
        title={_('New Alert')}
        onClick={onAlertCreateClick}
      />
    }
  </IconDivider>
));

ToolBarIcons.propTypes = {
  onAlertCreateClick: PropTypes.func.isRequired,
};

const AlertFilterDialog = createFilterDialog({
  sortFields: SORT_FIELDS,
});

const AlertsPage = ({
  showError,
  showSuccess,
  onChanged,
  onDownloaded,
  onError,
  ...props
}) => (
  <AlertComponent
    onCreated={onChanged}
    onSaved={onChanged}
    onCloned={onChanged}
    onCloneError={onError}
    onDeleted={onChanged}
    onDeleteError={onError}
    onDownloaded={onDownloaded}
    onDownloadError={onError}
    onTestSuccess={showSuccess}
    onTestError={showError}
  >{({
    clone,
    create,
    delete: delete_func,
    download,
    edit,
    save,
    test,
  }) => (
    <EntitiesPage
      {...props}
      filterEditDialog={AlertFilterDialog}
      sectionIcon="alert.svg"
      table={AlertTable}
      title={_('Alerts')}
      toolBarIcons={ToolBarIcons}
      onAlertCloneClick={clone}
      onAlertCreateClick={create}
      onAlertDeleteClick={delete_func}
      onAlertDownloadClick={download}
      onAlertEditClick={edit}
      onAlertTestClick={test}
      onAlertSaveClick={save}
      onError={onError}
      onPermissionChanged={onChanged}
      onPermissionDownloaded={onDownloaded}
      onPermissionDownloadError={onError}
    />
  )}
  </AlertComponent>
);

AlertsPage.propTypes = {
  showError: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
  onChanged: PropTypes.func.isRequired,
  onDownloaded: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default withEntitiesContainer('alert', {
  filtersFilter: ALERTS_FILTER_FILTER,
})(AlertsPage);

// vim: set ts=2 sw=2 tw=80:
