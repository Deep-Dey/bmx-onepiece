import { Tenant } from '../../tenant/interface/tenant';
import {NVerseSanitizer} from 'bmx-nverse-ts';

export class TenantSanitizer extends NVerseSanitizer<Tenant, Tenant> {

    public getSanitized = (entity: Tenant): Tenant => {
        return this.sanitizeObject(entity);
    }
}
